// Set [package.json] ---> "type" : "commonJS"

// require("./06_commonJS_temp.js") ----> {x , add}
// Here, an object {} of properties [x,add] is passed from the module [./06_commonJS_temp.js]
// So, object of properties = {x , add}

// Using all properties passed from the module at once : {x , add}
const {x , add} = require("./06_commonJS_temp.js")

console.log(x); // Output : 46
console.log(add(2,5)); // 7


// Inbuilt inside NodeJS ---> CommonJS---> (function (exports, require, module, __filename, __dirname)
// console.log(__dirname, __filename);

