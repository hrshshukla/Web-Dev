// If a Child class is Inherited from Pranent class and Child class has no constructor then a constructor is auto generated 
// And now if you pass any argument to child constructor it will be passed to Parent constructor. Even though child have no constructor
// const ChildObject = new Child("Hello") ----> super("Hello")

/* (+) Auto Cenerated Code

class Monkey extends Animal {
    +--------------------------+  
    | constructor(argument){   |
    |     super(argument)      |
    | }                        |
    +--------------------------+                         
}                                                                                                                                                   */

class Animal {
    constructor(name) {
        this.name = name
        console.log(this.name);
    }
}

class Monkey extends Animal {} // Monkey() have no constructor So it will pass "Wukong" to super class constructor --> super("Wukong")

const Monkey1 = new Monkey("Wukong") // Ouput : Wukong ---> (Called from Animal())
