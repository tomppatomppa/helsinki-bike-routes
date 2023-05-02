const route = require('express').Router()
const path = require('path')
const multer = require('multer')
const upload = multer({ dest: 'tmp/csv/' })
const parseCSV = require('../validators/parseCSV')
const fs = require('fs')
const validateJourney = require('../validators/validateJourney')

route.post('/add-many', upload.single('file'), async (req, res) => {
  let data = fs.createReadStream(req.file.path)

  const journeys = path.resolve(__dirname, '../' + data.path)
  const result = await parseCSV(journeys, validateJourney)

  res.status(200).json(result)
})

module.exports = route
