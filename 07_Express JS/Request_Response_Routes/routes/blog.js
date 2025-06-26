// Go to 07_reponse.js and run the server 


import express from "express";

const router = express.Router()

// this will handle : 127.0.0.1:3000/blog
router.get('/', (req, res)=>{
    res.send("This is homepage")
})

// this will handle : 127.0.0.1:3000/blog/about
router.get('/about', (req, res)=>{
    res.send("About US")
})

// this will handle : 127.0.0.1:3000/blog/anything
router.get('/:anything', (req, res)=>{
    res.send(`${req.params.anything} aisa kuch nhi hota`)
})

// module.exports = router --> commonJS
export default router;