// shortest answer 
let factorial = (n) => n <= 1 ? 1 : n * factorial(n-1)
console.log(factorial(6));
