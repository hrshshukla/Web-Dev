// chaining different endpoints 
// app.post().get().put()

import express from "express";

const app = express();
const port = 3000;

app.use( express.static('Public') )

app.post('/', (req, res)=>{ 
    res.send(`its a post request!!`)
    }).get('/', (req, res)=>{ 
    res.send(`its a get request!!`)
    }).put('/', (req, res)=>{ 
    res.send(`its a put request!!`)
    })


app.listen(port, ()=>{
    console.log(`server is running at ${port}`);
    
})