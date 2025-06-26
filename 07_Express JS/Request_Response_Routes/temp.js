// sending HTML file using --> res.sendFile()

import express from "express";

const app = express();
const port = 3000;


app.get('/api', (req, res) => {
    console.log('GET request received');
    res.send({ name : "harsh", age : "23"})
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
