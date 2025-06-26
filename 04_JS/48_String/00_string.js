

let str = "Harsh"

console.log(str.length); // Output : 5
console.log(str.replaceAll("h","s")); // Output : sarsh  ----->  replaceAll "h" with "s"


// _______________________________Template literals________________________________________________________

console.log("My name is : " + str); // Usual Way

// We can insert double-quote "" using Template literals so we use template literal
// --> console.log("The password is "harsh@123" "); ❌ Wrong 
       console.log(`The password is "harsh@123" `); // ✅ Correct

// When we insert variables directly in template literals, this is called string interpolation
console.log(`My name is : ${str}`); // Template literals



//__________________________ Escape Sequence Character_________________________________________________________________
console.log("harsh \" shukla"); // Output : harsh " shukla
console.log("harsh \n shukla"); // Use -> "\n" for new line 
