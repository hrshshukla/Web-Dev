// We should set [package.json] ---> "type" : "module"

// use : import [] from "module";
// Example --> import http from "http";


import http from "http";


const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html'); 
  res.end('<h1> Hello World againn </h1>'); 
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
}); 
