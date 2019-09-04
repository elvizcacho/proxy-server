const express = require('express');
const app = express();
const request = require('request');

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
    next();
});

app.get('/', function (req, res) {
    delete req.headers.host
    const options = {
        url: req.query.url,
        headers: {
            'Content-Type': req.header('Content-Type'),
            'Authorization': req.header('Authorization')
        }
    }
    request(options, (err, response, body) => {
        if (err) { return console.log(err); }
        res.send(body)
    });
});

app.listen(80, function () {
    console.log('Example app listening on port 3000!');
});