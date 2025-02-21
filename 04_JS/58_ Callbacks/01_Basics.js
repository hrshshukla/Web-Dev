// how to pass Function() as a argument into another

// Normal : This is how we usually pass any variable into function
function functionXYZ(argument) {
    argument // ------> this declaration means that the argument is going to be a variable 
}
let value = 10
functionXYZ(value)


// New Concept : This is how we pass any function as an argument into another function
function MyFunction(argument) {
    argument() // ------> this declaration means that the argument is going to be a function
}
function AnyFunction() { console.log("I'm Passed ") }


MyFunction(AnyFunction)
// function MyFunction(AnyFunction) {
//     AnyFunction() 
// }
