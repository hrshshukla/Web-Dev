

import express from "express";
import blog from './routes/blog.js'
import shop from './routes/shop.js'

const app = express();
const port = 3000;

app.use('/blog', blog) // all those endpoint which contains "/blog" like "127.0.0.1:3000/blog" will be handled by "blog" or "./routes/blog.js"
app.use('/shop', shop) // all those endpoint which contains "/shop" like "127.0.0.1:3000/shop" will be handled by "shop" or "./routes/shop.js"

app.get('/', (req, res)=>{
    console.log('hey its is post request');
    res.send(`Hello world post!!`)
})


app.listen(port, ()=>{
    console.log(`server is running at ${port}`);
    
})