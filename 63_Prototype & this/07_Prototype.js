// (1) Creating an [object] from the [Prototype] of another class
// (2) 

function ClassX() {
    this.ClassXVar = "I am a variable of ClassX"; // Instance variable
}

// Adding a function to ClassX's prototype
ClassX.prototype.greet = function () {
    console.log("I belong to ClassX");
};

// Creating ClassY using ClassX's prototype
const ClassY = Object.create(ClassX.prototype);

// Trying to access ClassXVar
console.log(ClassY.ClassXVar); // ❌ Undefined (ClassY did NOT inherit the instance variable)
ClassY.greet(); // ✅ Works! "Hello from ClassX"
