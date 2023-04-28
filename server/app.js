const express = require('express')
const app = express()

app.use(express.static('dist'))

app.get('/api', (req, res) => {
  res.send('Hello World!')
})

module.exports = app
