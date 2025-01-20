// 1. It takes two numbers as input from the user
// 2. It returns right answer 90% of times and wrong answer 10% 
// 3. It perfoms wrong operations as follows:
// +   ---> (-)
// *   ---> +
// (-) ---> /
// /   ---> **

// LEARNING : 
// -- eval() 
// -- usage of object and keyvalue pairs 


var randomNum = Math.random();
console.log(randomNum);

let num1 = prompt(" Enter Number 1: ")
let num2 = prompt(" Enter Number 2: ")
let oprtr = prompt(" Enter Operation : ")

let obj = {
    "+" : "-",
    "*" : "+",
    "-" : "/",
    "/" : "**"
}

// perfoms right operation
if (randomNum > 0.1) {
    alert(`Answer : ${eval(` ${num1} ${oprtr} ${num2}`)} `); 
    //   ( Answer : ${eval(      2       +        4   )}  )
}

// perfoms wrong operation
else{
    oprtr = obj[oprtr] // Explanation
    alert(`Answer : ${eval(` ${num1} ${oprtr} ${num2}`)} `);
}

// __________Explanation:__________

// The value of [oprtr] will become it's [keyvalue]
// Means, if oprtr = "+"
// then, keyvalue of "+" is "-"   ----->  "+" : "-"

// oprtr = obj[oprtr]
// oprtr = obj["+"]
// oprtr = "-" -----> obj["+"] = "-"

// Now, oprtr = "-"
