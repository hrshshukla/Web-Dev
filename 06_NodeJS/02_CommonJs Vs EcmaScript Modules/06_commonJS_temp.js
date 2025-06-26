// (+) As in ES6 we can target (default export) 
//     but in commonJS we cannot do that
// (+) 

// Method (1) : similar to (default export)  
module.exports = {
    a : 20,
    b : 30
}
    
// Method (2) : named export                                                                                    
let x = 46;


function add(a, b) {
    return a+b;
}

module.exports = {add, x};