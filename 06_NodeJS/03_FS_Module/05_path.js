import path from "path";

let myPath = 'd:\\Studies\\Coding\\Web-Dev\\06_NodeJS\\03_FS_Module\\01_writeFile.js'


console.log('File Extension : ' + path.extname(myPath));
console.log('File Name' + path.basename(myPath));

console.log('Directory Name : ' + path.dirname(myPath));

console.log(path.join('c:/' + 'programs\\myFile.txt'));

