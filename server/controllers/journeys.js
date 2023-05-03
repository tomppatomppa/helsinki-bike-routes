const route = require('express').Router()
const path = require('path')
const upload = require('../middleware/upload')
const parseCSV = require('../validators/parseCSV')
const { Station, Journey } = require('../models/index')

const validateFileUpload = require('../middleware/validateFileUpload')

const validateJourney = require('../validators/validateJourney')
const deleteTmpFile = require('../middleware/deleteTmpFile')

route.post(
  '/add-many',
  upload.single('file'),
  validateFileUpload,
  async (req, res) => {
    const filePath = path.resolve(__dirname, `../${req.file.path}`)
    const parsedJourneys = await parseCSV(filePath, validateJourney)

    const addedJourneys = await Journey.bulkCreate(parsedJourneys)
    deleteTmpFile(filePath)
    res.status(200).json({ addedJourneys: addedJourneys.length })
  }
)

route.get('/', async (req, res) => {
  const allJourneys = await Journey.findAll()
  res.status(200).json(allJourneys)
})
module.exports = route
