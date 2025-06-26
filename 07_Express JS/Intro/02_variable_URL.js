// Now we will create a variable URL and it will handle all endpoints 

import express from "express";
const app = express()
const port = 3000

// endpoint for all --> http://127.0.0.1:3000/anything
app.get('/:first', (req, res)=>{
    res.send(`Hello ${req.params.first}`); // --> Hello anything
    // req: {
    //       params: { first: 'about' }
    //       query : {}
    //      }
})

// nested endpoint --> http://127.0.0.1:3000/anything/something
app.get('/:first/:second', (req, res)=>{
    console.log(req);
    res.send(`Hello ${req.params.first} and ${req.params.second}`); // --> Hello anyhting and something
    // req: {
    //        params: { first: 'about', second: 'harsh' },
    //        query : {}
    //      }
}) 

app.listen(port, ()=>{
    console.log(`app is running at ${port}`);
})