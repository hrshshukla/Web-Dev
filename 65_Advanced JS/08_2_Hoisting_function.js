// As we know that [let] and [const] didn't support Hoisting but [var] does 
// So if we create a function with [let] OR [const] then it will also no support Hoisting

// Hoisting [var] function
console.log(sayHi); // Output: [undefined] but accessible. Hoisting Successfull ✅

var sayHi = function() {
  console.log("Hi!");
};

// Hoisting [let] function
console.log(sayHey); // ❌Error: Cannot access 'sayHey' before initialization

let sayHey = function() {
  console.log("Hey!");
};

// Hoisting [const] function
console.log(sayHey); // ❌Error: Cannot access 'sayHey' before initialization

const sayHello = function() {
  console.log("Hello!");
};