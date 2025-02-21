// Create a [const] MyObject. Now can you change the [keyvalues] to a number
// Also can you add a new [key value pair]   
const MyObject = {
    name : "harsh",
    branch : "BCA"
}

MyObject.name = 123456 // changing --> name : "harsh" --> name : 123456
MyObject.number = 888950896;  // Added new [key value pair]

console.log(MyObject); // Output : { name: 123456, branch: 'BCA', number: 888950896 }


