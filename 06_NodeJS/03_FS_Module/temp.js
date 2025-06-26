import  fs  from "fs";

console.log("starting");
fs.writeFile('harsh1.txt', "I am overwritten", ()=>{
    console.log('done');
})