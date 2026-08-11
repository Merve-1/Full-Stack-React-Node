const fs = require('fs');

const data = fs.readFileSync(
    './dev-data/data.json',
    'utf-8'
);

const services = JSON.parse(data);

module.exports = services;