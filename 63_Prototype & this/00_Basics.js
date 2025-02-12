// we can declare a function inside a class without [function] keyword called as Shorthand Method declaration 
// Also you can use [function] key word to declare function inside class 

// Without "function" keyword
const car1 = {
    drive() {  // No "function" keyword
        console.log("Driving...");
    }
}

car1.drive(); // Output: "Driving..."



// With "function" keyword
const car2 = {
    drive:function(){
        console.log("Driving...")
    }
}
car2.drive(); // Output: "Driving..."


