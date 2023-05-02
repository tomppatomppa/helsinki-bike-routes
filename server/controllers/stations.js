const route = require('express').Router()
const path = require('path')
const upload = require('../middleware/upload')
const parseCSV = require('../validators/parseCSV')

const validateStation = require('../validators/validateStation')
const deleteTmpFile = require('../middleware/deleteTmpFile')

const { Station } = require('../models/index')

route.post('/add-many', upload.single('file'), async (req, res) => {
  const filePath = path.resolve(__dirname, `../${req.file.path}`)
  const result = await parseCSV(filePath, validateStation)

  const filtered = result.map((station) => {
    const { ID, ...rest } = station
    const obje = {
      ID: ID,
    }
    return obje
  })

  const savedStations = await Station.bulkCreate(filtered)
  deleteTmpFile(filePath)

  res.status(200).json(savedStations)
})

route.get('/', async (req, res) => {
  const allStations = await Station.findAll()
  res.status(200).json(allStations)
})
module.exports = route
