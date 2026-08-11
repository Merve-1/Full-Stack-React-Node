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


const data = fs.readFile('./dev-data/data.json', 'utf-8', (err, data) => {
    if(err) {
        res.writeHead(500, {
                'Content-type': 'text/html',
                'my-own-header': 'hello-world'
        });
        res.end('<h1>Internal Server Error</h1>');
    }
    const productData = JSON.parse(data);
    
});
    

const server = http.createServer((req, res) => {
    console.log(
        `Request: ${req.method} ${req.url} | Port: ${req.socket.remotePort} | Remote Address: ${req.socket.remoteAddress} | Status: ${res.statusCode}`
    );
    // res.end('Hello from the server');

    const pathName = req.url;
    if (pathName === '/' || pathName === '/index') {
         fs.readFile('./templates/html/index.html', 'utf-8', (err, data) => {
        if (err) {
            res.writeHead(500, {
                'Content-type': 'text/html'
            });
            res.end('<h1>Internal Server Error</h1>');
            return;
        }

        res.writeHead(200, {
            'Content-type': 'text/html'
        });

        res.end(data);
    });

    }else if (pathName === '/css/style.css') {

    fs.readFile(
        './templates/css/style.css',
        'utf-8',
        (err, data) => {

            if (err) {
                res.writeHead(500, {
                    'Content-type': 'text/plain'
                });

                res.end('Could not load CSS');
                return;
            }

            res.writeHead(200, {
                'Content-type': 'text/css'
            });

            res.end(data);
        }
    );
    } else if (pathName === '/service' || pathName.startsWith('/service/')) {

    let id = 0;

    if (pathName.startsWith('/service/')) {
        id = Number(pathName.split('/')[2]);
    }

    fs.readFile('./dev-data/data.json', 'utf-8', (err, jsonData) => {

        if (err) {
            res.writeHead(500, {
                'Content-type': 'text/html'
            });

            res.end('<h1>Could not load data</h1>');
            return;
        }

        const services = JSON.parse(jsonData);

        const service = services.find(s => s.id === id);

        if (!service) {
            res.writeHead(404, {
                'Content-type': 'text/html'
            });

            res.end('<h1>Service not found</h1>');
            return;
        }

        fs.readFile(
            './templates/html/service.html',
            'utf-8',
            (err, data) => {

                if (err) {
                    res.writeHead(500, {
                        'Content-type': 'text/html'
                    });

                    res.end('<h1>Internal Server Error</h1>');
                    return;
                }

                const output = data
                    .replaceAll('{%SERVICE_NAME%}', service.serviceName)
                    .replaceAll('{%CATEGORY%}', service.category)
                    .replaceAll('{%PLATFORMS%}', service.platforms)
                    .replaceAll('{%SERVICE_TYPE%}', service.serviceType)
                    .replaceAll('{%PRICE%}', service.price)
                    .replaceAll('{%DESCRIPTION%}', service.description);

                res.writeHead(200, {
                    'Content-type': 'text/html'
                });

                res.end(output);
            }
        );
    });
    }else if(pathName === '/api'){
        res.writeHead(200, {
        'Content-type': 'application/json',
        'my-own-header': 'hello-world'
    });
    res.end(data);
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