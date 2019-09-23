const express = require('express')
const app = express()
const request = require('request')
const qs = require('qs')
const bodyParser = require('body-parser')
const cors = require('cors')


app.use(bodyParser.json())

const headerList =
    'Set-Cookie,' +
    'Cookie,' +
    'Authorization,' +
    'Access-Control-Allow-Credentials,' +
    'Access-Control-Allow-Headers,' +
    'Origin,Accept,' +
    'X-Requested-With,' +
    'Content-Type,' +
    'Access-Control-Request-Method,' +
    'Access-Control-Request-Headers,' +
    'X-CSRF-Token';

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'https://webservice2.minol.com')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE',
  )
  res.setHeader('Access-Control-Allow-Headers', headerList)
  res.setHeader('Access-Control-Expose-Headers', headerList)
  next()
})

const action = function(req, res) {

  if (!req.params[0]) {
    return res.send('Please add an url after /')
  }
  const url = `${req.params[0]}?${qs.stringify(req.query)}`

  const headers = {...req.headers}
  delete headers.host
  delete headers['accept-encoding']
  delete headers['content-length']

  const options = {
    method: req.method,
    url,
    headers,
    ...(req.body) ? {body: req.body} : {},
    json: true
  }
  request(options, (err, response, body) => {
    if (err) {
      return res.send(err)
    }
    for (const header of Object.keys(response.headers)) {
      res.set(header, response.headers[header])
    }
    res.send(body)
  })
}

app.all('/*', action)

app.listen(process.env.PORT || 3000, function() {
  console.log(`Example app listening on port ${process.env.PORT} or 3000!`)
})
