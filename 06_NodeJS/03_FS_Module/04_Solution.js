// To solve Callback Hell we use promises with file-system : [fs/promises]
// In [fs/promises] ---> "fs" provides files system features [And] "promises" returns a promise 
import fs from "fs/promises";

// As [fs/promises] returns a promise we can use [await] with it 
let file1 = await fs.writeFile("harsh1.txt", "I'm solution of Callback Hell")
let file2 = await fs.readFile("harsh1.txt")

console.log(file2.toString());
