let age = 19;

if (age<18) {
    console.log("You cant drive");
}

else{
    console.log("You can drive");
}

// Exponentiation Operator
console.log(3 ** 2); // pow(3,2) = 3^2

let a = 3;
a **= 3;
console.log(a); // 3^3 = 27



// Double Equal to [==] ----> Check Value only
if ("3" == 3) { console.log("True"); }
else          { console.log("false 3==3 "); }
// Output : True


// Triple Equal to [===] ----> Check Value & Type
if ("3" === 3) { console.log("True"); }
else           { console.log("false 3===3"); }
// Output : False 


// Ternary Operator 
let x = 10;
let y = 100;
let z = x > y ? (x-y) : (y-x);
//    = condition ? if : else


console.log(z);



