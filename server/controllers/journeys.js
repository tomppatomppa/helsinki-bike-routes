const route = require('express').Router()
const path = require('path')
const upload = require('../middleware/upload')
const parseCSV = require('../validators/parseCSV')

const validateFileUpload = require('../middleware/validateFileUpload')

const validateJourney = require('../validators/validateJourney')
const deleteTmpFile = require('../middleware/deleteTmpFile')

route.post(
  '/add-many',
  upload.single('file'),
  validateFileUpload,
  async (req, res) => {
    const filePath = path.resolve(__dirname, `../${req.file.path}`)
    const result = await parseCSV(filePath, validateJourney)

    deleteTmpFile(filePath)
    res.status(200).json(result)
  }
)

route.get('/', async (req, res) => {
  res.status(200).json('return all joryneys')
})
module.exports = route
