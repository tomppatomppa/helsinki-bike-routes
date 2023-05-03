const express = require('express')
const app = express()

require('express-async-errors')

const cors = require('cors')
const bodyParser = require('body-parser')

const journeysRouter = require('./controllers/journeys')
const stationsRouter = require('./controllers/stations')
const multerErrors = require('./middleware/multerErrors')

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.static('dist'))

app.use('/api/journeys/', journeysRouter)
app.use('/api/stations/', stationsRouter)

app.use(multerErrors)

app.get('/api', (req, res) => {
  res.send('Hello World!')
})

module.exports = app
