const url = require('url');
const https = require('https');
require('dotenv').config()
const { omdbkey } = process.env
const getMovies = function(req, res) {

    const queryObject = url.parse(req.url, true).query;
    const { search } = queryObject;

    if (search == undefined || search == null) {

        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({
            Error: "Bad request",
            Response: false
        }));

    }

    const external_url = `https://www.omdbapi.com/?apikey=${omdbkey}&s=${search.trim()}`

    const request = https.request(external_url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data = data + chunk.toString();
        });

        response.on('end', () => {
            const body = JSON.parse(data);
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify(body));
        });
    })

    request.on('error', (error) => {
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify(error));
    });

    request.end()
};

module.exports = {
    getMovies
}