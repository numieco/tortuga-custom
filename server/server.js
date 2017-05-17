const express = require('express')
const path = require('path')

const request = require('request')
const ghostSecret = require('../src/ghost-secret')

const app = express()
const host = process.env.HOST || "localhost"
const port = process.env.PORT || 8000

app.use(express.static(path.resolve(__dirname, "..", "public")))

app.get('/all', (req, res) => {

  request.get('https://all-american-gold.ghost.io/ghost/api/v0.1/posts/?limit=all&client_id='+ ghostSecret.clientId +'&client_secret='+ ghostSecret.clientSecret
    , (err, response, body) => {
      if (!err && response.statusCode == 200) {
        res.send(response.body)
      }
    }
  )
})

app.get('/slug/*', (req, res) => {

  request.get('https://all-american-gold.ghost.io/ghost/api/v0.1/posts/?limit=all&client_id='+ ghostSecret.clientId +'&client_secret='+ ghostSecret.clientSecret
    , (err, response, body) => {
      if (!err && response.statusCode == 200) {
        res.send(response.body)
      }
    }
  )
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "public", "index.html"))
})

app.listen(port, host, () => {
  console.log("server started at port: " + host + ":" + port)
})