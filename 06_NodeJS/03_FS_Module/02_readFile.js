// CommonJS : const fs = require("fs")

import fs from "fs";
// We want that once the file is created we can read its data 

// fs.writeFile("harsh1.txt", "hello sir this is writeFile", ()=>{
//     console.log("done");  
//     fs.readFile("harsh1.txt", (error, data)=>{
//         console.log(error); // Output : null 
//         console.log(data); // Output : <Buffer 68 65 6c 6c 6f 20 73 69 72 20 74 68 69 73 20 69 73 20 77 72 69 74 65 46 69 6c 65>
//         console.log(data.toString()); // Output : hello sir this is writeFile
//     })
// })

// Comment [writeFile] code to see [appendFile] effect
fs.appendFile("harsh1.txt", "\t new data", ()=>{ // Every time you run this code "new data" will get append again-n-again
    fs.readFile("harsh1.txt", (error, data)=>{
            console.log(data.toString()); 
        })
})