// Putting values of Array[] into Object{}
// when we do this, the object will assign [index] to each [value] copied from Array[] 

const array = [10, 20, 30, 40]
const object = {...array} // object = { 0:10,  1:20, 2:30, 3:40 }

console.log(object[0]); // Output : 10

