// Convert : "String" --> Array[] --> "String"
// split() : converts "string" value into Array[]
// reverse() : reverse the elements position in an Array[]
// join() : joins all the element of Array[] and make it "string" again

let String = "Harsh"
let Variable = String.split("") // Now [Variable] becomes Array[] 
    Variable = String.split("").reverse() // Here, Variable is still Array[]
    Variable = String.split("").reverse().join("") // But Now, again Variable became "string"

console.log(array);
