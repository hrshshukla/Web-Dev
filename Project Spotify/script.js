var allSongs = [];
var currentFolder;
var currentSongName = "";

async function getSongs(folder) {
    currentFolder = folder;
    let songsFile = await fetch(`http://127.0.0.1:3000/${folder}/`)
    let songText = await songsFile.text()

    let div = document.createElement("div")
    div.innerHTML = songText

    let anchorInSongText = div.getElementsByTagName("a")

    allSongs = []
    for (let i = 0; i < anchorInSongText.length; i++) {
        const element = anchorInSongText[i];

        if (element.href.endsWith('.mp3')) {
            allSongs.push(element.href.split(`/${folder}/`)[1])
        }
    }

    // Show all songs in Library
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const song of allSongs) {
        let songName = song.replaceAll("%20", " ").replaceAll(".mp3", "").split("-")[0]
        let artistName = song.replaceAll("%20", " ").replaceAll(".mp3", "").split("-")[1]
        let correctArtistName = artistName ? artistName : "Harsh"
        songUL.innerHTML += ` <li data-fullname="${song.replaceAll("%20", " ")}" >
                                <img class="invert" src="Images/music.svg" alt="">
                                <div class="info">
                                    <div class="songName">${songName}</div>
                                    <div class="songArtist" >${correctArtistName}</div>
                                </div>
    
                                <div class="playNow">
                                    <img src="Images/play.svg" alt="play">
                                </div>
                            </li>`
    }

    // Attach an eventlistner to each song
    let li_InSonglist = Array.from(document.querySelector(".songList").getElementsByTagName("li"))

    // Checking which song is being clicked 
    li_InSonglist.forEach(li => {
        li.addEventListener("click", () => {
            let clickedSongName = li.getAttribute("data-fullname").trim();

            // If the clicked song is the same as the current song, toggle play/pause
            if (clickedSongName === currentSongName) {
                if (currentSong.paused) {
                    currentSong.play();
                    li.querySelector(".playNow img").src = "Images/pause.svg";
                    play.src = "Images/pauseBar.svg";
                } else {
                    currentSong.pause();
                    li.querySelector(".playNow img").src = "Images/play.svg";
                    play.src = "Images/playBar.svg";
                }
            } else {
                // If a different song is clicked, play that song
                playSong(clickedSongName);
            }
        });
    });

    return allSongs;
}

// ------------------------------------

var currentSong = new Audio()
const playSong = (songName, pause = false) => {
    currentSongName = songName
    // Hide seekbar immediately when a new song is chosen
    seekbar.style.visibility = "hidden";

    // Reset current time for safety
    currentSong.currentTime = 0;
    seekbar.value = 0;
    seekbar.style.setProperty("--progress", "0%");

    currentSong.src =  `/${currentFolder}/` + songName // if songName = "track.mp3", then src = "/songs/track.mp3"

    // Once the new song metadata is loaded, show the seekbar
    currentSong.addEventListener("loadedmetadata", () => {
        // Reset the seekbar and display it
        seekbar.value = 0;
        seekbar.style.setProperty("--progress", "0%");
        seekbar.style.visibility = "visible";
    });

    // if song is not paused then play
    if (!pause) { // !pause = !false = true
        currentSong.play()
        play.src = "Images/pauseBar.svg"
    }

    document.querySelector(".songinfo").innerHTML = decodeURI(songName).replaceAll(".mp3","")
    document.querySelector(".songtime").innerHTML = "00:00 | 00:00"

      // Resetting all .playNow icons to play.svg
    document.querySelectorAll(".playNow img").forEach(img => {
        img.src = "Images/play.svg";
    });

    // Find the current playing song in the list and change its playNow icon
    let li_InSonglist = Array.from(document.querySelectorAll(".songList li"));
    li_InSonglist.forEach(li => {
        let songTitle = li.querySelector(".info .songName").innerText.trim();
        if (songTitle === songName.trim()) {
            li.querySelector(".playNow img").src = "Images/pause.svg";
        }
    });
}

// ------------------------------------

async function main() {
    // Get songs list
    await displayAlbums();

       // Select the first album card, if available
       let firstCard = document.querySelector(".card");
       if (firstCard) {
           // Construct the folder path. For example, if data-foldername="album1", then folder becomes "songs/album1"
           let folder = "songs/" + firstCard.dataset.foldername;
           allSongs = await getSongs(folder);
           playSong(allSongs[0], true);
       }

}

// Display all albums inside the songs folders 
async function displayAlbums() {
    let songsFolder = await fetch(`http://127.0.0.1:3000/songs/`)
    let songsFolderText = await songsFolder.text()

    let div = document.createElement("div")
    div.innerHTML = songsFolderText

    let AllAnchors = div.getElementsByTagName("a")

    let ArrAnchors = Array.from(AllAnchors)
    let cardContainer = document.querySelector(".cardContainer")

    for (let index = 0; index < ArrAnchors.length; index++) {
        const anchor = ArrAnchors[index];
            
        if (anchor.href.includes("/songs")) {
            let folder = anchor.href.split("/").slice(-2)[0]

            // Now Get the metadata of the folder, going to fetch info.json of each folder 
            let extractFolder = await fetch(`http://127.0.0.1:3000/songs/${folder}/info.json`)
            let folderJson = await extractFolder.json()

            cardContainer.innerHTML += `<div data-foldername="${folder}" class="card">
                                            <div class="play">
                                                <img src="Images/play.svg" alt="play">
                                            </div>
                                            <img src="/songs/${folder}/cover.jpg" alt="cover">
                                            <h2>${folderJson.title}</h2>
                                            <p>${folderJson.description}</p>
                                        </div>`
        }
    }

    // eventlistner for All Cards, this will return the foldername (inside the songs) to allSongs 
    let allCards = Array.from(document.getElementsByClassName("card"))
    allCards.forEach(card => {
        card.addEventListener("click", async (thatCard) => {
            allSongs = await getSongs(`songs/${thatCard.currentTarget.dataset.foldername}`)
            playSong(allSongs[0])
        })
    })

}

// this eventlistner will control [playIcon] and [pauseIcon] inside playBar
play.addEventListener("click", () => {
    if (currentSong.paused) {
        currentSong.play();
        play.src = "Images/pauseBar.svg";
    } else {
        currentSong.pause();
        play.src = "Images/playBar.svg";
    }
    
    // Reset all "playNow" icons of other songs in SongsUL
    document.querySelectorAll(".playNow img").forEach(img => img.src = "Images/play.svg");

    // If currentSong is NOT paused then its playing, update "playNow" icon of currentSong
    if (!currentSong.paused) { 
        document.querySelectorAll(".songList li").forEach(li => {
            let songTitle = li.querySelector(".info .songName").innerText.trim();
            // Get songName from the list and compare with the currentSong's name
            if (songTitle === currentSongName.trim()) { // Pending : need to use POP() in other places 
                // Change the playNow icon to pause for the currentsong
                li.querySelector(".playNow img").src = "Images/pause.svg";
            }
        });
    }
});

// this function is to convert time format passed from the  eventlistner : timeupdate (below)
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}


// eventlistner for seekbar
let seekbar = document.querySelector(".seekbar");
let songtime = document.querySelector(".songtime")

seekbar.value = 0;
currentSong.addEventListener("timeupdate", () => {
    songtime.innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} | ${secondsToMinutesSeconds(currentSong.duration)}`;
    let progress = (currentSong.currentTime / currentSong.duration) * 100;
    seekbar.style.setProperty("--progress", (progress + 0.1) + "%");

    seekbar.value = progress;
});

seekbar.addEventListener("input", () => {
    currentSong.currentTime = (currentSong.duration * seekbar.value) / 100;
});


// event listener on hambuger for changing the position of .left 
let hamburger = document.querySelector(".hamburger")
let left = document.querySelector(".left")

hamburger.addEventListener("click", () => {
    left.style.left = "0";
})

// event listener on .close for changing .left
let close = document.querySelector(".close")

close.addEventListener("click", () => {
    left.style.left = "-110%";
})

// M-------------------------------------------------------------------------M

// event listener for Previous Song: when manually tapped by mouse cursor 
previous.addEventListener("click", () => {
    handlePrevious();
});

// event listener for Next Song: when manually tapped by mouse cursor 
next.addEventListener("click", () => {
    handleNext();
});

// event listener for Next & Previous Song when ArrowLeft and ArrowRight key is pressed
document.addEventListener("keydown", function(event) {
    if (event.code === "ArrowLeft") {
        event.preventDefault(); // Prevent any default behavior
        handlePrevious();
    } else if (event.code === "ArrowRight") {
        event.preventDefault(); // Prevent any default behavior
        handleNext();
    }
});

// Helper function to handle previous song logic
function handlePrevious() {
    let currentSongIndex = allSongs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    
    if (currentSongIndex - 1 >= 0) {
        currentSong.pause(); //  // Only change the song if there is one after the current that song
        playSong(allSongs[currentSongIndex - 1]);
    }
}

// Helper function to handle next song logic
function handleNext() {
    let currentSongIndex = allSongs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if (currentSongIndex + 1 < allSongs.length) {
        currentSong.pause();
        playSong(allSongs[currentSongIndex + 1]);
    }
}

// W-------------------------------------------------------------------------W

// eventlistner for volume Bar
let volumeBar = document.querySelector(".volumeBar")
const updateVolumeBar = () => {
    let progress = volumeBar.value + "%";
    volumeBar.style.background = `linear-gradient(to right, #00D271 ${progress}, #ffffff ${progress})`;
};

window.addEventListener("DOMContentLoaded", updateVolumeBar);
volumeBar.addEventListener("input", () => {
    currentSong.volume = volumeBar.value / 100;
    updateVolumeBar();
});


//eventlistner for mute and unmute song 
let volumeIcon = document.querySelector(".volume>img")
console.log(volumeIcon);
volumeIcon.addEventListener("click", (element) => {
    if (element.target.src.includes("volume.svg")) {
        element.target.src = element.target.src.replace("volume.svg", "mute.svg")
        document.querySelector(".volume").getElementsByTagName("input")[0].value = 0 // for volumeBar
        currentSong.volume = 0  // for Song Volume
    }

    else {
        element.target.src = element.target.src.replace("mute.svg", "volume.svg")
        document.querySelector(".volume").getElementsByTagName("input")[0].value = 10 // for volumeBar
        currentSong.volume = .10  // for Song Volume
    }
})

// Function to update volumeBar background
const updateSeekbar = () => {
    let progress = (currentSong.currentTime / currentSong.duration) * 100 || 0;
    seekbar.style.setProperty("--progress", `${progress}%`);
    seekbar.value = progress;
};

// New code: Listen for spacebar key to toggle play/pause
document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        event.preventDefault();  // Prevent default spacebar behavior (like scrolling)
        if (currentSong.paused) {
            currentSong.play();

            play.src = "Images/pauseBar.svg";
            // Update the corresponding "playNow" icon in the song list
            document.querySelectorAll(".songList li").forEach(li => {
                let songTitle = li.querySelector(".info .songName").innerText.trim();
                if (songTitle === currentSongName.trim()) {
                    li.querySelector(".playNow img").src = "Images/pause.svg";
                }
            });
        } else {
            currentSong.pause();
            play.src = "Images/playBar.svg";
            // Update the corresponding "playNow" icon in the song list
            document.querySelectorAll(".songList li").forEach(li => {
                let songTitle = li.querySelector(".info .songName").innerText.trim();
                if (songTitle === currentSongName.trim()) {
                    li.querySelector(".playNow img").src = "Images/play.svg";
                }
            });
        }
    }
});

// eventlistner for volume control keys (ArrowUp/AudioVolumeUp and ArrowDown/AudioVolumeDown)
document.addEventListener("keydown", function(event) {
    event.preventDefault();  // Prevent default scrolling behavior

    if (event.code === "ArrowUp" || event.code === "AudioVolumeUp") {
        // Increase volume by 10%, ensuring it doesn't exceed 100%
        let currentVolume = parseInt(volumeBar.value, 10) || 0;
        let newVolume = Math.min(100, currentVolume + 2);
        volumeBar.value = newVolume;
        currentSong.volume = newVolume / 100;
        updateVolumeBar();
    } 
    
    else if (event.code === "ArrowDown" || event.code === "AudioVolumeDown" ) {
        // Decrease volume by 10%, ensuring it doesn't go below 0%
        let currentVolume = parseInt(volumeBar.value, 10) || 0;
        let newVolume = Math.max(0, currentVolume - 2);
        volumeBar.value = newVolume;
        currentSong.volume = newVolume / 100;
        updateVolumeBar();
    }
});



main()

window.onload = function () {
    document.getElementById("loader").style.display = "none";
};