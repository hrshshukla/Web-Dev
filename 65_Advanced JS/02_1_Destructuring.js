// Destructing is way to assign the value 
// it is used to unpack the [values] form an [array] or [properties] from an [object] into different variables 
// LEARNING: 
// -- [otherFruits] is a object
// -- we can use (...) for rest of the values. like : (...otherFruits) for values [ "Cherry", "Grapes"]



// (1) Using Destructing to unpack [values] form an [array]
const [Fruit1, Fruit2, ...otherFruits] = ["Apple", "Mango", "Cherry", "Grapes"] 
console.log(Fruit1, Fruit2, otherFruits); // Output :  Apple  Mango  [ 'Cherry', 'Grapes' ]


// Now because [otherFruits] holds multiple value [ 'Cherry', 'Grapes' ] that makes it object
console.log(typeof(otherFruits)); // Output: object 


// (2) Using Destructing to unpack [properties] form an [object]
const {Name, age} = { name : "Harsh", age: 19}
console.log(Name, age); // Output : Harsh 19

