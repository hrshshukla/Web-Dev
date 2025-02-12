// In JavaScript : Base Class = Super Class  &  Derived Class = Sub Class 
// super() is used inside a subclass to call the constructor of super class called as parent class
// It helps initialize the parent’s properties in the child class.

// Working : 
// class Lion --> constructor("Simba", 5) --> super("Simba") --> class Animal --> constructor("Simba") --> this.name = "Simba"
// class Lion --> constructor("Simba", 5) --> this.age = 5 


class Animal {
    constructor(name) {
        this.name = name
    }
}

class Lion extends Animal {
    constructor(name, age) { // constructor("Simba", 5)
        super(name) // super("Simba")
        this.age = age 
    }
}

const LionKing = new Lion("Simba", 5)
console.log(LionKing.name) // Simba (Called from Animal())
console.log(LionKing.age)  // 5     (Defined in Lion())