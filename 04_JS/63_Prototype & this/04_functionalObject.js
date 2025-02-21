// Constructor functions (like Person) are function objects because they store properties and create instances.

function Person(name) {
    this.name = name;
}

// Adding a method to the function object
Person.sayHello = function() {
    console.log("Hello, I am a person!");
};

// Creating an instance
const p1 = new Person("John");

console.log(p1.name); // "John"
Person.sayHello();  // "Hello, I am a person!"
