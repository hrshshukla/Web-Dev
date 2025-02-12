// (+)  prompt("xyz") ---->  prompt returns a string value not number 
// So to convert string into numbers we use ----> parseInt()



// Without : parseInt()
let a = prompt("Enter Num 1 :") // assuming : a = "20"
let b = prompt("Enter Num 2 :") // assuming : b = "30"
let c = a + b // "20" + "30"

console.log(c); // Ouput : 2030

// With : parseInt()
let x = prompt("Enter Num 1 :") // assuming : a = "20"
let y = prompt("Enter Num 2 :") // assuming : b = "30"
let z = parseInt(x) + parseInt(y)  // Now,  string : "20" + "30"  [converted into] ----> numbers : 20 + 30

console.log(c); // Ouput : 50
