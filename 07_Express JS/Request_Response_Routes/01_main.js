// POST request 
// Step 1: Send --> Hello world post!! (to localhost : 127.0.0.1)
// Step 2: Now fetch localhost html page : 127.0.0.1 using --> JS (page.html)
// Step 3: Open (page.html) loo for -> "Hello world post!" 

import express from "express";

const app = express();
const port = 3000;

app.use( express.static('Public') )

app.post('/', (req, res)=>{
    console.log('hey its is post request');
    res.send(`Hello world post!!`)
})


app.listen(port, ()=>{
    console.log(`server is running at ${port}`);
    
})