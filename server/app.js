const express = require('express')
const app = express()

const cors = require('cors')

const journeysRouter = require('./controllers/journeys')
const stationsRouter = require('./controllers/stations')

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

app.use('/api/journeys/', journeysRouter)
app.use('/api/stations/', stationsRouter)

app.get('/api', (req, res) => {
  res.send('Hello World!')
})

module.exports = app
