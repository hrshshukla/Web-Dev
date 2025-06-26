// Named exporting
import { a, b, c} from "./05_ES6_temp.js";
console.log(a, b, c); // Output : 20 80 100 

// Default exporting
import tempObj from "./05_ES6_temp.js";
console.log(tempObj); // Ouptut : { MyName: 'Harsh', Age: '19' }