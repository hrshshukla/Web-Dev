// if we are using : require()
// We should set [package.json] ---> "type" : "commonJS"

// Otherwise if we set [package.json] ---> "type" : "module"
// then it will give error

const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3001;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html'); 
  res.end('<h1> Hello World again </h1>'); 
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
}); 
