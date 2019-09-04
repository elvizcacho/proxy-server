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

    if (!req.query.url) {
        return res.send('Use url query param to pass the url you want to send through the proxy server')
    }

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

app.listen(process.env.PORT || 3000, function () {
    console.log(`Example app listening on port ${process.env.PORT} or 3000!`);
});