/*
 What is  Error-Object in Catch()?
 When an error occurs in JavaScript, the catch(error) block receives an error object with three main properties:

 -- error.name ------> Type of error (e.g., ReferenceError, TypeError)
 -- error.message ---> Description of the error
 -- error.stack	----> Detailed stack trace (shows where the error happened) */

function orderPizza(pizza) {
    try {
        if (pizza){ console.log(`✅ Order placed: ${pizza}`) }
        
        throw new Error("🍕 You must select valid pizza name!") 
    } 
    catch (errorMsg) {
        console.log("⚠️ ERROR OCCURRED:");
        console.log("🔹 Name:", errorMsg.name);  // Type of error
        console.log("🔹 Message:", errorMsg.message);  // Error description
        // console.log("🔹 Stack location:", errorMsg.stack);  // Error location
    }
}

orderPizza(null) 