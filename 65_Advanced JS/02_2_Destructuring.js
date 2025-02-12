
//  Without Destructuring: 
const car1 = { brand: "Tesla", model: "Model 3", year: 2023 };

const brand1 = car1.brand
const model1 = car1.model
const year1 = car1.year

console.log(brand1, model1, year1);  // Output: Tesla   Model 3   2023


// With Destructuring 
const car2 = { brand: "Tesla", model: "Model 3", year: 2023 };
const { brand, model, year } = car2;

console.log(brand, model, year);  // Output: Tesla   Model 3   2023



