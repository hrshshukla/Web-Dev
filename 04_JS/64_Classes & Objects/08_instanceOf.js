// [instanceof]  tells if an object is inherited from a class or not 
// Syntax : <obj> instanceof <class> 

class Animal {}

class Monkey extends Animal {}

const monkey1 = new Monkey()

// [monkey1] is created from  [class Monkey]
console.log(monkey1 instanceof Monkey); // Output : true

// Also [monkey1] is created from [class Monkey] and [class Monkey] is created form [class Animal]
console.log(monkey1 instanceof Animal); // Output : true

