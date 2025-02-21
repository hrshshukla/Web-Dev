// 11. The Array Filterer:
//     You are building a search feature for your e-commerce site. 
//     Write a function named filterProducts that takes an array of product objects and a filter criterion. 
//     The function should return a new array containing only the products that match the filter criterion.


let products = [
    { name: "T-shirt", category: "Clothing", price: 500 },
    { name: "Laptop", category: "Electronics", price: 50000 },
    { name: "Shoes", category: "Clothing", price: 1500 },
    { name: "Headphones", category: "Electronics", price: 2000 }
];

let filterProducts = (productsList, criteria) => {
    let [key, value] = Object.entries(criteria)[0] // [ 'price', 500 ]
    // Now, (key = price) & (value = 500)
    
    let finalArray = productsList.filter((product)=>{ // iteration (1) : product = { name: "T-shirt", category: "Clothing", price: 500 }
       return product[key] === value; 
    // return product[price] === 500;
    // return            500 === 500;

    })
    return finalArray
}

console.log(filterProducts(products, {price: 500}));