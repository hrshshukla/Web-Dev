console.log("JavaScript Started");

// Part : 1 
var str = "Harsh";
var num1 = 5;
var num2 = 5;
console.log(num1+num2);
console.log( "Datatype of (num1) is " + typeof num1, ", (num2) is  " + typeof num2, ", (str) is  " + typeof str);

console.log((num1 + num2)*2);
// __________________________________________________________________________________________________________________


// Part :2 
// [var] ---> Global variable
// [let] ---> Local Variables 

var a = 88;
{
    let a = 24;
    console.log(a); // Output : 24 
}
console.log(a); // Output : 88
// __________________________________________________________________________________________________________________



// Part :3
// Objects
// Keypoint : typeof NULL = object 

let obj = {
    "name" : "Harsh",
    "college" : "VITS"
}
console.log(obj); // {name: 'Harsh', college: 'VITS'}


obj.branch = "bca";
console.log(obj); // {name: 'Harsh', college: 'VITS', branch: 'bca'}

