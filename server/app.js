const express = require('express')
const app = express()
const path = require('path')
require('express-async-errors')

const cors = require('cors')
const bodyParser = require('body-parser')

const journeysRouter = require('./controllers/journeys')
const stationsRouter = require('./controllers/stations')
const errorHandler = require('./middleware/errorHandler')

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.static('dist'))

app.use('/api/journeys/', journeysRouter)
app.use('/api/stations/', stationsRouter)

app.use(errorHandler)

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})
app.get('/api', (req, res) => {
  res.send('Hello World!')
})

module.exports = app
