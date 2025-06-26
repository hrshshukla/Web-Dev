// If we want that anyone can acess a specific file from our app
// then we do : app.use( express.static( {folderName/fileName} ) )
// To access that file : http://127.0.0.1:3000/fileName.txt

import express from "express";

const app = express();
const port = 3000;

app.use( express.static('Public')) // Now we can access all the files inside 'Public" folder

app.get('/',(req, res)=>{
    res.send("Hello Sir")
})

app.listen(port, ()=>{
    console.log(`running at ${port}`);
    
})