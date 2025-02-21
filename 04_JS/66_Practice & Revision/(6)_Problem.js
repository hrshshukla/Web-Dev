// create an Array[] of squares of given number
// Solution (1) : modern and simple --> exponentiation (**)
// Solution (2) : Old method --> Math.pow


const input = require('readline-sync')

let Userinput = parseInt(input.question("Enter : "))
let powerLength = parseInt(input.question("Enter length: "))


let squareArray = []

for (let index = 0; index <= powerLength ; index++) {
    let value = Userinput ** index // ----> modern and simple --> exponentiation (**)
 // let value = Math.pow(Userinput, index)
    squareArray.push(value)
}

console.log(squareArray);
