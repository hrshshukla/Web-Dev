// 3. The Mirror Mirror: Imagine you have a string, and you need to create a new string that is a mirror image of the original.
//    Write a function that appends the reversed version of the original string to itself.
// Input : "abc" -----> ouptut : "abccba"

// Solution (1) : Long and lengthy process : reversed function (below)
// Solution (2) : Short and Sweet process : String.split("").reverse().join("")

let String = "Harsh"

// Solution (1) : Long and lengthy process
function reverseFunction (str) {
    let finalString = str + " | "
    for (let i = str.length; i > 0; i--) {
        let tempString = str[i-1]
        finalString = finalString.concat(tempString)
    }
    return finalString
}
console.log(reverseFunction(String)); // Harsh | hsraH


// Solution (2) : Short and Sweet process
let reversedString = String + " | "
    reversedString = reversedString.concat(String.split("").reverse().join(""))
console.log(reversedString);

