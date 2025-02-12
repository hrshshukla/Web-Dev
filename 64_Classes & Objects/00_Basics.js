// Private field in JavaScript

class Person {
    #name; // Private field

    constructor(name) {
        this.#name = name;
    }

    greet() {
        console.log(`Hello, my name is ${this.#name}`);
    }
}

const p1 = new Person("Harsh");
p1.greet(); // "Hello, my name is Harsh"
