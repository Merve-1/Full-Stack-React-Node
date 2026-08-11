//file system module
const fs = require('fs');
//http module
const http = require('http');

const hello = 'Hello World';
console.log(hello);

//Read file synchronously
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);


//Server
// const server = http.createServer((req, res) => {
//     console.log(`Someone connected from IP: ${req.socket.remoteAddress}`);

//     res.end('Hello from the server');
// });

const server = http.createServer((req, res) => {
    console.log(
        `Request: ${req.method} ${req.url} | IP: ${req.socket.remoteAddress}`
    );

    res.end('Hello from the server');
});

server.listen(8000, '0.0.0.0', () => {
    console.log('Listening to requests on port 8000');
});