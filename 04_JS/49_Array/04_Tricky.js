// In JavaScript, both Array[] and objects{} are technically type of "object"
// Means : typeof(Array[]) = object  Also  typeof(Object{}) = object
// So there are two solutions for this :
// -- Array.isArray()
// -- "instanceof" [keyword]

// (1) Array.isArray()
let arr = [1, 2, 3];
let obj = { a: 1, b: 2 };

console.log(Array.isArray(arr)); // true
console.log(Array.isArray(obj)); // false

// (2) "instanceof" [keyword]
console.log(arr instanceof Array); // true
console.log(obj instanceof Array); // false

