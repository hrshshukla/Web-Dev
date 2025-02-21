// var, let, and const are all function-scoped when declared inside a function.
// means var, let, and const can't be accessed outside the function 

function myFunction() {
    var funcVar = "(var) ✅";
    let funcLet = "(let) ✅";
    const funcConst = "(const) ✅";
    
    console.log("Successfull access : ", funcVar, funcLet, funcConst);   // Output: Successfull access :  (var)✅  (let)✅  (const)✅
    
}
myFunction();

// Accessing Outside 
console.log(funcVar, funcLet, funcConst );  //❌Error : funcVar, funcLet, funcConst are not defined