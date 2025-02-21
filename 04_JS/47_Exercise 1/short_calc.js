// After making a simple calc in C++ then I making this calc in JS only in 5 lines sounds very funny!!

let num1 = prompt("Enter Num 1 : ")
let oprtr = prompt(" Operation (+ - * / **) : ")
let num2 = prompt("Enter Num 2: ")

console.log(`Answer : ${eval(` ${num1} ${oprtr} ${num2} `)}`);