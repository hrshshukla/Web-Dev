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

// 
    console.log(MomName.startsWith("Pra")); // true ----> becasue "Pratima" is starting with "Pra"
    console.log(MomName.endsWith("bha")); // false ----> becasue "Pratima" do not ends with "bha"

// Strings are Immuteable (cannot be changed)
    let place = "Agra"
    place[0] = "S"

    console.log(place); // Agra
    

    
    