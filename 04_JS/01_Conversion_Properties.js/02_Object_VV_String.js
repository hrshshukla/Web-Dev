let obj = {
    Name : "Harsh",
    Age : 19
}

let string = JSON.stringify(obj) // [Object] --> to --> [String]
console.log(string);  // Output :  {"Name":"Harsh","Age":19}

let newObject = JSON.parse(string) // [String]  --> to --> [Object]
console.log(newObject); // Ouput : { Name: 'Harsh', Age: 19 }






