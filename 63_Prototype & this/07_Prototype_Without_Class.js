// Using Prototype without classes and objects 
// 

function Human() {}
Human.prototype.speak = function() { console.log("I can speak") } // declearing speak() inside prototype of Human()


function Student() {}
Student.prototype.study = function() { console.log("I can study") } // declearing study() inside prototype of student()


Object.setPrototypeOf(Student.prototype, Human.prototype)


const student1 = new Student()
student1.speak() // I can speak


const Human1 = new Human()
Human1.study() // ERROR : because [Student.prototype] is inherited from ---> [Human.prototype]
//                         but [Human.prototype] is NOT inherited from ---> [Student.prototype] 
//                          And if you try to inherit [Human.prototype] from ---> [Student.prototype] it give ERROR

Object.setPrototypeOf(Human.prototype, Student.prototype) // This error will look like : Cyclic __proto__ value