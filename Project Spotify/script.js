var allSongs = [];

async function getSongs() {
    let songsFile = await fetch("http://127.0.0.1:3000/songs/")
    let songText = await songsFile.text()

    let div = document.createElement("div")
    div.innerHTML = songText

    let anchorInSongText = div.getElementsByTagName("a")

    let songs = []
    for (let i = 0; i < anchorInSongText.length; i++) {
        const element = anchorInSongText[i];

        if (element.href.endsWith('.mp3')) {
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs
}

// ------------------------------------

var currentSong = new Audio()
const playSong= (songName, pause=false)=>{
    currentSong.src = "/songs/" + songName // if songName = "track.mp3", then src = "/songs/track.mp3"

    // if song is not paused then play
    if (!pause) { // !pause = !false = true
        currentSong.play()
        play.src = "pauseBar.svg"
    }

    document.querySelector(".songinfo").innerHTML = decodeURI(songName)
    document.querySelector(".songtime").innerHTML = "00:00"
}

// ------------------------------------

async function main() {
    // Get songs list
    allSongs = await getSongs()
    playSong(allSongs[0], true)

    // Show all songs in Library
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of allSongs) {
        songUL.innerHTML += ` <li>
                            <img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div class="songName">${song.replaceAll("%20", " ")}</div>
                                <div class="songArtist" >Song Artist</div>
                            </div>

                            <div class="playNow">
                                <span>Play Now</span>
                                <img src="play.svg" alt="play">
                            </div>
                        </li>`
    }

    // Attach an eventlistner to each song
    let li_InSonglist = Array.from(document.querySelector(".songList").getElementsByTagName("li"))

    // Checking which song is being clicked 
    li_InSonglist.forEach(li => {
        // clicked song will be send to playSong()
        li.addEventListener("click", (event) => {
            playSong(li.querySelector(".info").firstElementChild.innerHTML.trim()) // even if you dont use trim it still works, but sometimes path may include [space]
        });
    });
    
}
    // this eventlistner will control playbutton inside playBar
    play.addEventListener("click", ()=>{
        if(currentSong.paused){
            currentSong.play()
            play.src = "pauseBar.svg"
            
        }
        else{
            currentSong.pause()
            play.src = "playBar.svg"
        }
    }) 

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

    // this eventlistner will return the currenttime : runs when the song start playing
    let circle = document.querySelector(".circle")
    let songtime = document.querySelector(".songtime")

    currentSong.addEventListener("timeupdate",()=>{
        // setting time of the song 
        songtime.innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} | ${secondsToMinutesSeconds(currentSong.duration)}`
        
        // setting position of the seekbar's circle by calculating  its position with (currentTime / duration)
        circle.style.left =  (currentSong.currentTime / currentSong.duration) * 100 + "%"

    })

    // eventlistner for seekbar
    let seekbar = document.querySelector(".seekbar")
    seekbar.addEventListener("click", (element)=>{
        let clickPointPercent = (element.offsetX / element.target.getBoundingClientRect().width  ) * 100 
        // element.target.getBoundingClientRect().width  = "Total width "
        // element.offsetX =  "Clicking Point in width 
        
        circle.style.left = clickPointPercent + "%";
        console.log(circle.style.left);
        currentSong.currentTime = ((currentSong.duration) * clickPointPercent)/100 ;
        console.log(currentSong.currentTime);
    })

    // event listener on hambuger for changing the position of .left 
    let hamburger = document.querySelector(".hamburger")
    let left = document.querySelector(".left")

    hamburger.addEventListener("click", ()=>{
        left.style.left = "0";
    })

    // event listener on .close for changing .left
    let close = document.querySelector(".close")
    
    close.addEventListener("click", ()=>{
        left.style.left = "-100%";
    })
    

    // Add an event listener to previous
    previous.addEventListener("click", () => {
        let currentSongIndex = allSongs.indexOf(currentSong.src.split("/").slice(-1)[0])
        currentSong.pause()
        if ((currentSongIndex - 1) >= 0) {
            playSong(allSongs[currentSongIndex - 1])
        }
    })


    // Add an event listener to next
    next.addEventListener("click", () => {
        currentSong.pause()

        let currentSongIndex = allSongs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((currentSongIndex + 1) < allSongs.length) {
            playSong(allSongs[currentSongIndex + 1])
        }
    })


main()
