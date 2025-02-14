// Asynchronous Behaviour in JS 
// To solve (Asynchronous Behaviour) we use [await], by using [await] next line of code will not run until await returns 

console.log("I am first Output");
console.log("I am second Output");

setTimeout(() => {
    console.log("I am third Output but I will appear in last as I have timeValue");
}, 0);

console.log("The End");

// Output :
// I am first Output
// I am second Output
// The End
// I am third Output but I will appear in last as I have timeValue

// Here : [setTimeout] will run at the END because it takes time, even though It only took only 0ms (which is fast) still. 