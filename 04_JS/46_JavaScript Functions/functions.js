// LERANING : Nan = Not a Number
//            --- 3 + undefined = Nan


function greeting(Name) {
    console.log("Hello " + Name);
}
greeting("Harsh") // Output: Hello Harsh
//_________________________________________________________________________

// Sum Function
function sum(a,b) {
    console.log(a+b); // Output: 4
    return a+b;
}

let c = sum(1,3);
console.log(c); // Output: 4
//_________________________________________________________________________

// Parameterized Function
function none(a,b=3){
    //body
}
//_________________________________________________________________________


// Arrow Function
const funcAndVar = (parameter) => { // Here [funcAndVar] acting as a variable and a function in same time
    console.log(parameter);
    return parameter+20;
}

funcAndVar(20);
console.log(funcAndVar);
