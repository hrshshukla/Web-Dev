// _____________________Old Method______________________| _____________________New Method______________________
// (1) No guarantee of code execution after try-catch   | (1) Ensures code execution after try-catch           
// (2) Cleanup logic needs to be repeated in multiple   | (2) Cleanup logic runs in one place, reducing redundancy
//     places                                           | 


// Without [finally]  
function OldMethod() {
    try {
        console.log("Trying to execute...");
        let result = 10 / 0; // Error: Division by zero (logical error)
    } 
    catch (errorMsg) {
        console.log("Caught an error:", errorMsg.message);
    }
    console.log("This may or may not run if an error occurs.");
}
OldMethod();



// With [finally]  ------> Why we actually use [finally] real-concept ----->  IMPORTANT : https://www.youtube.com/clip/Ugkxn7XJTJbKqgB-siyF6Ozg86qbTVSLiOFP
function NewMethod() {
    try {
        console.log("Trying to execute...");
        let result = 10 / 0; // Error: Division by zero (logical error)
    } 
    catch (errorMsg) {
        console.log("Caught an error:", errorMsg.message);
    } 
    finally {
        console.log("This will **always** run, but put me inside a function to see my real capabilities ");
    }
}
NewMethod();
