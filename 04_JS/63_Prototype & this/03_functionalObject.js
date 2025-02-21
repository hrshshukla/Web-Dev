// Functional Object : A functional object is an object that can be called as a function while also holding properties like an object.

function greet() {
    console.log("Hello!");
}

// Adding properties to the function
greet.language = "English";
greet.sayHi = function() {
    console.log("Hi there!");
};

// Calling it like a function
greet();  // Output: Hello!

// Accessing it like an object
console.log(greet.language);  // Output: English
greet.sayHi();  // Output: Hi there!

