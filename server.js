const express = require('express');
const app = express();
const request = require('request');
const qs = require('qs')

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
    next();
});

app.get('/*', function (req, res) {

    if (!req.params[0]) {
        return res.send('Please add an url after /')
    }

    const url = `${req.params[0]}?${qs.stringify(req.query)}`

    const options = {
        url,
        headers: {
            'Content-Type': req.header('Content-Type'),
            'Authorization': req.header('Authorization')
        }
    }
    request(options, (err, response, body) => {
        if (err) { return res.send(err); }
        res.send(body)
    });
});

app.listen(process.env.PORT || 3000, function () {
    console.log(`Example app listening on port ${process.env.PORT} or 3000!`);
});