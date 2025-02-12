// Block Scope : Variables declared inside a block { ... }, like in loops or if-else are block-scoped.
// [let] and [const] are block-scoped, but [var] ignores block scope
// means [var] can be accessed outside the block code but [let] and [const] can't


if (true) {
    var blockVar = "(var) ✅";
    let blockLet = "(let) ✅";
    const blockConst = "(const) ✅";
    
    console.log("Successfull access : ", blockVar, blockLet, blockConst);   // Output: Successfull access :  (var)✅   (let)✅   (const)✅
}

// Accessing Outside 
console.log("Successfull access : ", blockVar);   // Output: Successfull access :  (var)✅ 
console.log("Successfull access : ", blockLet, blockConst);   // ❌Error : blockLet, blockConst are not defined
