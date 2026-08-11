const fs = require('fs');

const services = require('../variables/data');

exports.getService = (req, res) => {

    let id = 0;

    if (req.url.startsWith('/service/')) {
        id = Number(req.url.split('/')[2]);
    }

    const service = services.find(
        service => service.id === id
    );

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
        (err, html) => {

            if (err) {

                res.writeHead(500, {
                    'Content-type': 'text/html'
                });

                res.end(
                    '<h1>Could not load service page</h1>'
                );

                return;
            }

            const output = html
                .replaceAll(
                    '{%SERVICE_NAME%}',
                    service.serviceName
                )
                .replaceAll(
                    '{%CATEGORY%}',
                    service.category
                )
                .replaceAll(
                    '{%PLATFORMS%}',
                    service.platforms
                )
                .replaceAll(
                    '{%SERVICE_TYPE%}',
                    service.serviceType
                )
                .replaceAll(
                    '{%PRICE%}',
                    service.price
                )
                .replaceAll(
                    '{%DESCRIPTION%}',
                    service.description
                );

            res.writeHead(200, {
                'Content-type': 'text/html'
            });

            res.end(output);
        }
    );
};