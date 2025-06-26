// In commonJS where we import using require('module')
//   we can directly use "__dirname" and "__filename"

// But in ES6 we have to do it manually using "path" and "url" module 
// example :
// File -> 03_sendFile.js  
// Located at -> D:\Studies\Coding\Web-Dev\Express JS\Req, Res & Routers\

import express from "express";

import path from 'path';
import { fileURLToPath } from 'url';

// These two lines recreate __dirname

const __filename = fileURLToPath(import.meta.url);
// import.meta.url  --> "file:///D:/Studies/Coding/Web-Dev/Express%20JS/Req,%20Res%20&%20Routers/03_sendFile.js"
// fileURLToPath(import.meta.url); --> "D:\Studies\Coding\Web-Dev\Express JS\Req, Res & Routers\03_sendFile.js"

const __dirname = path.dirname(__filename);
// path.dirname(__filename); --> Output: "D:\Studies\Coding\Web-Dev\Express JS\Req, Res & Routers"

console.log(__filename);
console.log(__dirname);