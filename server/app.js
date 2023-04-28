const express = require('express')
const app = express()

const cors = require('cors')

const tripsRouter = require('./controllers/trips')

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

app.use('/api/trips/', tripsRouter)

app.get('/api', (req, res) => {
  res.send('Hello World!')
})

module.exports = app
