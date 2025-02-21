/* Ways to Create a Class in JavaScript
---------------------------------------------------------------------------------------
|         Method          | Supports this? |    Inheritance?      | Private Members?  |
----------------------------------------------------------------------------------------
| class                   | ✅            | ✅                   | ✅ (ES2020 #)     |
| class with extend       | ✅            | ✅                   | ✅                |
| Object.create()         | ✅            | ✅                   | ❌                |
| Object Literal          | ❌            | ❌                   | ❌                |
--------------------------------------------------------------------------------------*/

// ------------------ Using "class" keyword ------------------
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Hello, ${this.name} your age is ${this.age} \n`);
    }
}

const p1 = new Person("Harsh", 19);
p1.greet();  // "Hello, Harsh your age is 19"



// ------------------ Using class with extends ------------------
class Human {
    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log(`Hello, I'm ${this.name}`);
    }
}

class Student extends Human {
    constructor(name, grade) {
        super(name);
        this.grade = grade;
    }

    study() {
        console.log(`${this.name} is studying. \n`);
    }
}

const s1 = new Student("Harsh", "A");
s1.greet(); // "Hello, I'm Harsh"
s1.study(); // "Harsh is studying."




// ------------------ Using Object.create() ------------------
const Base = {
    greet() {
        console.log(`Hello, ${this.name} your age is ${this.age} \n`);
    }
};

const derived = Object.create(Base);
derived.name = "Harsh";
derived.age = "19";
derived.greet(); // "Hello, Harsh your age is 19"


// ------------------ Using Object Literal ------------------
const Human2 = {
    name: "Harsh",
    age: 20,
    greet() {
        console.log(`Hello, I'm ${this.name}`);
    }
};

Human2.greet(); // "Hello, I'm Harsh"
