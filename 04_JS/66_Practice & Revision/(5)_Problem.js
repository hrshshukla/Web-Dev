// Take create a Array[] keep taking input from user until "0" is added 
// Now filter all those numbers which are divisible by 10  
const input = require('readline-sync')

let array = [];
let Userinput;

for (; Userinput !== 0;) {
    Userinput = parseInt(input.question("Enter : "))
    if (Userinput !== 0 ) {
        array.push(Userinput)
    }
}

let divisor = parseInt(input.question("Choose divisor : "))
let isDivisible = [] 
array.forEach(value => {
    if (value%divisor === 0) { // instead of divisor = 10, I've set custom divisor 
        isDivisible.push(value)
    }
});

console.log(isDivisible);