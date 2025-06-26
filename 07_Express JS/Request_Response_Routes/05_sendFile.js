// sending HTML file using --> res.sendFile()
// res.sendFile() either take (absolute path of the file) or (filename + root directory path)
import express from "express";
import path from "path";
import { fileURLToPath }  from "url";

const app = express();
const port = 3000;

app.use( express.static('Public') )

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app.get('/index', (req, res)=>{
    console.log('hey its is get request');
    res.sendFile('templates/myPage.html', {root : __dirname})
    //                  ( filename  + root directory path)
})

app.listen(port, ()=>{
    console.log(`server is running at ${port}`);
})