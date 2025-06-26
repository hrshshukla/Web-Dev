// CommonJS : const fs = require("fs")

import fs from "fs";

// Case 1 : we can use [writeFileSync] when we want Synchronous Workflow in code 

console.log("starting.."); // First this will run 

fs.writeFileSync("harsh1.txt", "hello sir this is writeFileSync") // In Second this will run

console.log("completed"); //In Third this will run 

// ------------------------------------------------------------------------------------------

// Case 2 : we can use [writeFile] when we want Asynchronous Workflow in code 

console.log("starting.."); // First this will run 

fs.writeFile("harsh2.txt", "hello sir this is writeFile", ()=>{
    console.log('done');
    
}) // In Last this will run

console.log("completed"); //In Second this will run 