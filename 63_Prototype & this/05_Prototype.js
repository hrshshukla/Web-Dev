// [[Prototype]] and Prototype Inheritance :
// -- Every object has an internal hidden property called [[Prototype]], which refers to another object from which it can inherit properties.
// -- means objects can inherit properties and methods from other objects. This is managed through the [[Prototype]] mechanism.


//  [[Prototype]] (Implicit Prototype)
// -- Access an object's prototype using Object.getPrototypeOf(obj) or the __proto__ property 

const Human = {
    greet(){
        console.log("Hello I'm Human");
    }
}

const Student = {
    study(){
        console.log("I am studying...");
    }
}

Object.setPrototypeOf(Student, Human) // Object.setPrototypeOf(Obj, prototype_Obj)

Student.study();  // "I am studying..."     --> ✅ Own method 
Student.speak();  // "Hello, I am a human!" --> ✅ Inherited from Human