const route = require('express').Router()
const path = require('path')
const upload = require('../middleware/upload')

const parseCSV = require('../validators/parseCSV')
const { Journey, Station } = require('../models/index')

const validateFileUpload = require('../middleware/validateFileUpload')

const validateJourney = require('../validators/validateJourney')
const deleteTmpFile = require('../middleware/deleteTmpFile')
const filterJourneys = require('../validators/filterJourneys')
const { Op } = require('sequelize')

route.post(
  '/add-many',
  upload.single('file'),
  validateFileUpload,
  async (req, res) => {
    const filePath = path.resolve(__dirname, `../${req.file.path}`)
    const parsedJourneys = await parseCSV(filePath, validateJourney)

    const filteredJourneys = await filterJourneys(parsedJourneys)

    if (filteredJourneys.length === 0) {
      return res.status(400).json({ error: 'No valid journeys' })
    }

    const addedJourneys = await Journey.bulkCreate(filteredJourneys)

    deleteTmpFile(filePath)

    res.status(200).json({ addedJourneys: addedJourneys.length })
  }
)

route.get('/', async (req, res) => {
  const { offset = 0, limit = 1 } = req.query

  let order = ['id', 'ASC']
  if (req.query.order) {
    order = req.query.order
  }

  let where = {}
  if (req.query.search && req.query.search_field) {
    const { search_field } = req.query
    where = {
      [Op.or]: [{ [search_field]: { [Op.iLike]: `%${req.query.search}%` } }],
    }
  }

  const allJourneys = await Journey.findAndCountAll({
    offset: offset,
    limit: limit,
    where,
    order: [order],
  })

  let cursor = 0

  cursor += Number(offset) + allJourneys.rows.length

  if (cursor >= allJourneys.count) {
    cursor = undefined
  }

  res.status(200).json({ allJourneys, nextCursor: cursor })
})
module.exports = route
