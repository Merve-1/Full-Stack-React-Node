//file system module
const fs = require('fs');
//http module
const http = require('http');
//url module
const url = require('url');

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
        `Request: ${req.method} ${req.url} | Port: ${req.socket.remotePort} | Remote Address: ${req.socket.remoteAddress} | Status: ${res.statusCode}`
    );
    // res.end('Hello from the server');

    const pathName = req.url;
    if (pathName === '/' || pathName === '/overview') {
        res.end('This is the OVERVIEW');
    }else if (pathName === '/product') {
        res.end('This is the PRODUCT');
    }else if(pathName === '/api'){
        fs.readFile('./data.json', 'utf-8', (err, data) => {
            if(err) {
                res.writeHead(500, {
                    'Content-type': 'text/html',
                    'my-own-header': 'hello-world'
                });
                res.end('<h1>Internal Server Error</h1>');
            }
            res.writeHead(200, {
                'Content-type': 'application/json',
                'my-own-header': 'hello-world'
            });
            res.end(data);
        });
    }else{
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found!</h1>');
    }
});

server.listen(8000, '0.0.0.0', () => {
    console.log('Listening to requests on port 8000');
});