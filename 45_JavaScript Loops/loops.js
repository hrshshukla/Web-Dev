for (let i = 1; i <= 10; i++) { 
    console.log(i);
}

// _________________________________________________________________________________________________________

//_for-in_loop

let obj={
    Name : "Harsh",
    Batch : "BCA",
    Year : "1st Year"
}
// Here [Name, Batch, Year] are the key

for (const key in obj) {
    console.log(obj); // { Name: 'Harsh', Batch: 'BCA', Year: '1st Year' }
    console.log(key); // Output : Name  Batch   Year

    const element = obj[key]; // obj[key] means values of [keys] inside the [obj]

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