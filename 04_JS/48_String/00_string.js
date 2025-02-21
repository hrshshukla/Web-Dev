

let str = "Harsh"

console.log(str.length); // Output : 5
console.log(str.replaceAll("h","s")); // Output : sarsh  ----->  replaceAll "h" with "s"


// _______________________________Template literals________________________________________________________

console.log("My name is : " + str); // Usual Way
console.log(`The password is "harsh@123" `);// We can insert double-quote "" using Template literals 

// When we insert variables directly in template literals, this is called string interpolation
console.log(`My name is : ${str}`); // Template literals



//__________________________ Escape Sequence Character_________________________________________________________________
console.log("harsh \n shukla"); // Output : "\n" for new line 
console.log("harsh \" shukla"); // Output : harsh " shukla
