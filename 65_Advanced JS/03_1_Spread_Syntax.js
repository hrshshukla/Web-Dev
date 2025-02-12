// Implementing Spread Syntax : Array[] & Object{}

// (1) Array[] ------------------
function Sum(a, b, c) {
    console.log(a+b+c); 
}

let arr = [2, 3, 4]
Sum(arr[0], arr[1],arr[2]) // Ouput : 9 (but it took time to write)
Sum(...arr) // Ouput : 9  (✅ easy and fast )

// Sum(arr) ----> ❌Wrong


// (2) Copying one array into another (✅Smoooth !!)
let OldArray = [1, 2, 3, 4, 5]
let NewArray = [...OldArray, 6, 7]
console.log(NewArray); // Output :   [ 1, 2, 3, 4, 5, 6, 7 ]




// (3) Object{}
const Person = { name : "Harsh", age : 19}
const College = { College : "VITS" }

const IDCard = { ...Person, ...College} // Merging the value of Person{} and College{}

console.log(IDCard); // Output : { name: 'Harsh', age: 19, College: 'VITS' }
