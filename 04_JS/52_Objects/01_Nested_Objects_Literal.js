// Objcet Literals OR Plain Object: 
// -- These objects has Simple key-value pairs without any blueprint or constructor.
// -- Why they are called Object Literal? because they are defined using the literal syntax {} directly in the code.
// Learning : Nested objects : object in side object ---> Person{ contact{} }

const person = {
    name: "Harsh Shukla",
    age: 20,
    gender: "Male",
    occupation: "Student",
    hobbies: ["Sitting Free"],

    // Here contact{} is a object inside a object called Person{}
    contact: { 
        phone: "8889650896",
        email: "harsh@example.com"
    }
}

console.log(typeof(person.gender)); // Output : string
console.log(typeof(person.contact)); // Output : object
console.log(typeof(person.contact.email)); // Output : string
