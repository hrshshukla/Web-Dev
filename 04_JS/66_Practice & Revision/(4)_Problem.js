// Extracts numbers from the string 
// Solution (1) : simple method --> (/[0-9]+/g)
// Solution (2) : complex method --> (/\d+/g)

let text = "Please give rs 1000 2000" ;
 
let numbers = text.match(/[0-9]+/g)
console.log(numbers); // Output: ['1000', '2000']


let numbers2 = text.match(/\d+/g);  
console.log(numbers2);  // Output: ['1000', '2000']