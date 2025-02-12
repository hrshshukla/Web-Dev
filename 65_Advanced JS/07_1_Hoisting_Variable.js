/* When variables can be accessed before their declaration this happens because of Hoisting 
-- (?) So what hosting actually means ?
-- (+) Hoisting refers to the process of moving declarations to the --> "top" of their scope before code execution.

-- (+) IMPORTANT : [let] and [const] didn't support Hoisting but [var] does                                                 */


console.log(y);  // ❌Error: Cannot access 'y' before initialization
let y = 10;

console.log(z);  // ❌Error: Cannot access 'z' before initialization
const z = 20;

console.log(x); // ✅ Ouput : [undefined] but "x" is accessible
var x = 6