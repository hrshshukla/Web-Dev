// The Problem : Callback Hell 
// this problem arises when : we have multiple files to read and write 
// Means, when I want to create a file [harsh1.txt] and when the file is created 
//      then a function is called to, create [harsh2.txt] file and when [harsh2.txt] is created 
//       then a function is called to, create [harsh3.txt] file and so on...

// This will create a Callback Hell 
// For solution : 04_Solution.js


fs.writeFile("harsh1.txt", "hello sir this is writeFile", ()=>{
    console.log("done");  
    fs.readFile("harsh1.txt", (error, data)=>{
        console.log(error, data.toString()); 

        // Again read & write 
        fs.writeFile("harsh1.txt", "hello sir this is writeFile", ()=>{
            console.log("done");  
            fs.readFile("harsh1.txt", (error, data)=>{
                console.log(error, data.toString());
                
                // Again read & write 
                fs.writeFile("harsh1.txt", "hello sir this is writeFile", ()=>{
                    console.log("done");  
                    fs.readFile("harsh1.txt", (error, data)=>{
                        console.log(error, data.toString());
                        
                        // Again read & write 
                        fs.writeFile("harsh1.txt", "hello sir this is writeFile", ()=>{
                            console.log("done");  
                            fs.readFile("harsh1.txt", (error, data)=>{
                                console.log(error, data.toString());
                            })
                        })
                    })
                })

            })
        })
    })
})