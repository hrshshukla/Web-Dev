// _________________________________________________________________________________________________________

//_for-in_loop

let Details={               // let obj = {
    Name : "Harsh",         //       key : obj[key]
    Batch : "BCA",          //       key : obj[key]
    Year : "1st Year"       //       key : obj[key]
}
// Here [Name, Batch, Year] are the key

for (const key in Details) {
    console.log(key); // Output : Name  Batch   Year

    const element = Details[key]; // obj[key] means values of [keys] inside the [obj]

    // print : key + element
    console.log(key, element); // [Name Harsh]   [Batch BCA]   [Year 1st Year]
}

// _________________________________________________________________________

// for-of_loop : used with [array] or [string]

for (const itr of "Harsh") {
    console.log(itr);
}
// Output 
// H
// a
// r
// s
// h

// _________________________________________________________________________________________________________

// While_loop
let a = 5;
while (a<10) {
    console.log("a<10 : "+a);
    a++;
}


// _________________________________________________________________________________________________________

// do-while_loop
let x = 10;
do {
    console.log(x<10);
} while (x<10);