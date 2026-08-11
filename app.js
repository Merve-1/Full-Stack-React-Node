const http = require('http');
const fs = require('fs');

const serviceController = require('./controllers/serviceController');

const server = http.createServer((req, res) => {

    const pathName = req.url;

    // OVERVIEW
    if (
        pathName === '/' ||
        pathName === '/index' ||
        pathName === '/overview'
    ) {

        fs.readFile(
            './templates/html/index.html',
            'utf-8',
            (err, data) => {

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
            }
        );

    // SERVICE
    } else if (
        pathName === '/service' ||
        pathName.startsWith('/service/')
    ) {

        serviceController.getService(req, res);

    // CSS
    } else if (
        pathName === '/css/style.css'
    ) {

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

    // API
    } else if (
        pathName === '/api'
    ) {

        fs.readFile(
            './dev-data/data.json',
            'utf-8',
            (err, data) => {

                if (err) {
                    res.writeHead(500, {
                        'Content-type': 'application/json'
                    });

                    res.end(JSON.stringify({
                        status: 'error'
                    }));

                    return;
                }

                res.writeHead(200, {
                    'Content-type': 'application/json'
                });

                res.end(data);
            }
        );

    // 404
    } else {

        res.writeHead(404, {
            'Content-type': 'text/html'
        });

        res.end('<h1>Page not found!</h1>');
    }

});

server.listen(8000, '0.0.0.0', () => {
    console.log('Listening to requests on port 8000');
});