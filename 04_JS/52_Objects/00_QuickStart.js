// (1) : Key Value pairs 
    let Details={               // let obj = {
        Name : "Harsh",         //       key : obj[key]
        Batch : "BCA",          //       key : obj[key]
        Year : "1st Year"       //       key : obj[key]
    }
// --> Here [Name, Batch, Year] are the key

// (2) : Insert new value inside the object 
    Details.Age = 20;
    console.log(Details);


// (3) : Another way to access 
    let ele = Details["Batch"];
    console.log(ele);

