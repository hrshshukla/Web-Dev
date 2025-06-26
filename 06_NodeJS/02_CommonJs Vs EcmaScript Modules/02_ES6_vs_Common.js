// There are two ways to import [package] 

// Method (1) : 
// using CommonJS : require() ------> DEFAULT 
// Here, [package.json] ---> "type" : "commonjs"
// In this, when we import modules using require()  
// then the modules loads [synchronously] 

// Method (2) : 
// -- EcmaScript 6   [OR]  ES6
// -- using module : import {  } from "module";
// Here, [package.json] ---> "type" : "module"
// In this, when we import modules using import {  } from "module"; 
// then the modules loads [Asynchronously] 