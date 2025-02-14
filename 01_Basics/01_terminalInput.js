
// (1) Open PowerShell as Administrator
// (2) Command : Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Bypass
// (3) Type [A] (Yes to All) and press Enter.
// (4) Open VS Code and RUN : 
// (5) npm install readline-sync ------> to install
// (6) npm list readline-sync ------> to check if installed 
// (7) Code :  
//              const input = require('readline-sync');

//              let name = input.question("Enter your name: ");
//              console.log("Hello, " + name); 



const input = require('readline-sync');

let name = input.question("Enter your name: ");
console.log("Hello, " + name);