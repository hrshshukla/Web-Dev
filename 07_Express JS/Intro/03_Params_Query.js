// Open .md file : {03_Pramas_Query.md} at right side 

// params also called (Route parameter) are used in URL with -> '/'
// example :
//  URL -> http://localhost:3000/about/harsh
//  params : { first: 'about', second: 'harsh' }
//  query : {}

// query also called (Query parameter) are used after URL with -> '?'
// example : 
// URL -> http://localhost:3000/about/harsh/search?q=car&color=red
// params : { first: 'about', second: 'harsh' }
// query : { q: 'car', color : 'red' }


import express from "express";
const app = express()
const port = 3000

app.get('/:first', (req, res)=>{
// Case (1) :  
    // For URL --> http://127.0.0.1:3000/about
    // req: {
    //       params: { first: 'about' }
    //       query : {}
    //      }

    console.log(req.params); // { first: 'about' }
    console.log(req.query);  // {}

// Case (2) :  
    // For URL --> http://127.0.0.1:3000/about?q=car&color=red
    // req: {
    //       params: { first: 'about' }
    //       query : { q: 'car', color: 'red'}
    //      }

    console.log(req.params); // { first: 'about' }
    console.log(req.query);  // { q: 'car', color: 'red'}
})


app.listen(port, ()=>{
    console.log(`app is running at ${port}`);
})