import express from "express";

const app = express();
const port = 3000;

// app.get(path, handler)

// endpoint (1) --> http://127.0.0.1:3000
app.get('/',(req, res)=>{
    res.send("Hello Sir!!")
})

// endpoint (2) --> http://127.0.0.1:3000/about
app.get('/about',(req, res)=>{
    res.send("About Us")
})

// endpoint (3) --> http://127.0.0.1:3000/contact
app.get('/contact',(req, res)=>{
    res.send("Contact Us")
})

// Now above you can see we need to create different endpoints for each path
// Now go to 02_variable_URL.js

app.listen(port, ()=>{
    console.log(`app is running at port : ${port}`);
})