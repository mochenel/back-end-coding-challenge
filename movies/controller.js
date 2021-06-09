const http = require('http');
const url = require('url');

module.exports = http.createServer((req, res) => {

    var service = require('./service.js');
    const reqUrl = url.parse(req.url, true);

    // GET Movies
    if (reqUrl.pathname == '/movies' && req.method === 'GET') {

        service.getMovies(req, res);
    }
});