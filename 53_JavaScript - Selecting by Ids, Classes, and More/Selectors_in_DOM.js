// Trageting Using <Tag>
document.getElementsByTagName("div").style

// Trageting Using .class
let boxes = document.getElementsByClassName("box")
boxes[1].style.backgroundColor = "blue" // second-box gets blue ---> beacuse [0] = first-box

// Trageting Using #ID
document.getElementById("red").style.backgroundColor = "red"




//Trageting Using querySelector
document.querySelector(".box").style.backgroundColor = "orange" // Only first-box gets orange



// To Traget All boxes whuich come under the [.box]
document.querySelectorAll(".box") // ---> this returns a NodeList like Array of all [.box], So we cannot directly apply style in NodeList/Array

// We need to loop to apply styles in each box 
let arr = document.querySelectorAll(".box")

for (let i = 0; i < arr.length; i++) {
    arr[i].style.backgroundColor = "red"
}

// Same thing but No [arr] and Used [for-each] loop
document.querySelectorAll(".box").forEach( Each_box => {
    Each_box.style.backgroundColor = "yellow"
})


// RUN in BROWSER
// matches
AllBoxes = document.getElementsByClassName("box")
console.log(AllBoxes); // [div.box.box1], [div.box.box2], [div#red.box.box3], [div.box.box4], [div.box.box5]
AllBoxes[3].matches("#red") // Output : true

  

// closest
NearestElement = document.getElementsByClassName("box")
console.log(NearestElement);
NearestElement[2].closest(".container") // find the [.container] and return also it will check till last tag(html) 
                                        // returns [NULL] if not found


// contain
document.querySelector(".container").contains(document.querySelector(".box1")) // true
document.querySelector(".container").contains(document.querySelector("body")) // false