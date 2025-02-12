// _____________________Old Method______________________ | _____________________New Method______________________
// (1) Can not throw Custom Message to Catch()           | (1) Can throw Custom Message to Catch()               
// (2) Can not throw error manually                      | (2) Can throw error manually even if there is no error



// Normal Method : without [throw] 
function OldthrowError() {
    try {
        // you can only throw error if they really happens 
        return notDefinedVar; // ❌ Error
    } 
    catch (errorMsg) {
        console.log(errorMsg.message); // notDefinedVar is not defined (generated error message by its own)
    }
}
OldthrowError()




// With [throw]
function NewthrowError() {
    try {
        // Even though there is no error but still you can throw (error + this message) and it will work
        throw new Error("I'm user manual ERROR + I give custom ERROR message ");
    } 
    catch (errorMsg) {
        console.log(errorMsg.message); // "I'm user manual ERROR + I give custom ERROR message "
    }
}
NewthrowError()


