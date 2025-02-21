
let number = prompt(" Enter Number : ")
let arr = [];

for (let i = 0; i < number; i++) {
    arr[i] = number-i
}
console.log(arr);

let factorial = (num1 , num2) => {
    return num1 * num2;
}

console.log(arr.reduce(factorial));