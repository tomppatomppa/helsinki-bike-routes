const route = require('express').Router()
const path = require('path')
const upload = require('../middleware/upload')
const parseCSV = require('../validators/parseCSV')

const validateStation = require('../validators/validateStation')
const deleteTmpFile = require('../middleware/deleteTmpFile')

const { Station } = require('../models/index')
const validateFileUpload = require('../middleware/validateFileUpload')

route.post(
  '/add-many',
  upload.single('file'),
  validateFileUpload,
  async (req, res) => {
    const filePath = path.resolve(__dirname, `../${req.file.path}`)
    const result = await parseCSV(filePath, validateStation)

    const savedStations = await Station.bulkCreate(result, {
      ignoreDuplicates: true,
    })

    deleteTmpFile(filePath)
    res.status(200).json({ stationsAdded: savedStations.length })
  }
)

route.get('/', async (req, res) => {
  const allStations = await Station.findAll()
  res.status(200).json(allStations)
})

module.exports = route
