// String --- [to]--- Array 
    let Name = "Harsh"
    let array = Name.split() // [ 'Harsh' ]
    let array2 = Name.split('') // [ 'H', 'a', 'r', 's', 'h' ]


// Lowercase & UpperCase
    let name = "Harsh"
    console.log( "Usign -> toUpperCase() : " + name.toUpperCase()); // Output : HARSH
    console.log( "Usign -> toLowerCase() : " + name.toLowerCase()); // Output : harsh
    console.log( "Length : " + name.length); // Output : 5
    
// slice()
    let BroName = "Adarsh"
    console.log(BroName.slice(2)); // Output : arsh
    console.log(BroName.slice(2,4)); // Output : ar     slice( [start], [end-1] ) ----->RAW : slice (2,4) = Final : slice (2,3)



// Replace & concatinate  ---> replace() & concat()
    let MomName = "Pratibha"
    MomName = MomName.replace("Pratibha", "Pratima"); // Pratibha --> [replaced] --> Pratima
    console.log(MomName); // MomName = "Pratima"

    console.log(MomName.concat(BroName, "successfully concatinated!!"));
    console.log("MomName");



// Remove white space ---> trim()
    let fatherName = "  Ayodhya   "
    console.log(fatherName);        // Output : [  Ayodhya   ]
    console.log(fatherName.trim()); // Output : [Ayodhya]



// Index 
    console.log(MomName[0]);
    console.log(MomName.indexOf("ti")); // 3


// Strings are Immuteable (cannot be changed)
    let place = "Agra"
    place[0] = "S"

    console.log(place); // Agra
    

    
// test() ---> returns [true] OR [false]
let password = "13429Abcd"
let hasNumber = /[0-9]/.test(password)
console.log(hasNumber); // true
