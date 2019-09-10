const express = require('express')
const app = express()
const request = require('request')
const qs = require('qs')

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE',
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, X-CSRF-Token',
  )
    res.setHeader('access-control-expose-headers', 'X-CSRF-Token')
  next()
})

const action = function(req, res) {
  if (!req.params[0]) {
    return res.send('Please add an url after /')
  }

  const url = `${req.params[0]}?${qs.stringify(req.query)}`

  const options = {
    url,
    headers: {
      'X-CSRF-Token': req.header('X-CSRF-Token'),
      'Content-Type': req.header('Content-Type'),
      Authorization: req.header('Authorization'),
    },
  }
  request(options, (err, response, body) => {
    if (err) {
      return res.send(err)
    }
    const csrfToken = response.headers['x-csrf-token']
    if (csrfToken) {
      res.set('X-CSRF-Token', csrfToken)
    }
    res.send(body)
  })
}

app.post('/*', action)
app.get('/*', action)
app.head('/*', action)
app.put('/*', action)
app.patch('/*', action)
app.delete('/*', action)
app.options('/*', action)

app.listen(process.env.PORT || 3000, function() {
  console.log(`Example app listening on port ${process.env.PORT} or 3000!`)
})
