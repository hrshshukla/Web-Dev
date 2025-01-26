// shortest answer 
let factorial = (n) => n <= 1 ? 1 : n * factorial(n-1)
console.log(factorial(6));

// Answer using different function 
let arr = []
let number = 6

function fact(a,b) {
    arr = Array.from(Array(number+1).keys())
    let answer = arr.slice(1,).reduce((a,b)=> {return a*b }) // reduce(function) OR reduce(function declaration)
    return answer
}

console.log(fact(number));
