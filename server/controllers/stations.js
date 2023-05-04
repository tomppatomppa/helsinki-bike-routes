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
  let where = {}
  if (req.query.search && req.query.search_field) {
    const { search_field } = req.query
    where = {
      [Op.or]: [{ [search_field]: { [Op.iLike]: `%${req.query.search}%` } }],
    }
  }

  const { offset = 0, limit = 1 } = req.query

  const allStations = await Station.findAndCountAll({
    offset: offset,
    limit: limit,
    where,
  })

  let cursor = 0

  cursor += Number(offset) + allStations.rows.length

  if (cursor >= allStations.count) {
    cursor = undefined
  }

  res.status(200).json({ allStations, nextCursor: cursor })
})

module.exports = route
