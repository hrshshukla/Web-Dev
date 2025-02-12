//  it took me 1 hrs to build this logic 
var arr_box = document.getElementsByClassName("box")
console.log(arr_box);


// Explanation 
function randomColor() {
    const letter = "0123456789ABCDEF"
    let Color = "#"

    for (let i = 0; i < 6; i++) { // beacuse there is [6] letter in hex-color code : #917200
        Color += letter[Math.floor(Math.random() * 16)] // interesting line
    }
    return Color
}

for (let i = 0; i < arr_box.length; i++) {
    setInterval(() => {
        arr_box[i].style.color = randomColor()
        arr_box[i].style.backgroundColor = randomColor()
    }, 300);

}
