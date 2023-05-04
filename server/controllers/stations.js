const route = require('express').Router()
const path = require('path')
const upload = require('../middleware/upload')
const parseCSV = require('../utils/parsers/parseCSV')

const validateStation = require('../utils/validators/validateStation')
const deleteTmpFile = require('../middleware/deleteTmpFile')

const { Station, Journey } = require('../models/index')
const validateFileUpload = require('../middleware/validateFileUpload')
const { Op, Sequelize } = require('sequelize')

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
    const { search, search_field } = req.query
    const fields = search_field.split(',')
    const conditions = fields.map((field) => ({
      [field.trim()]: {
        [Op.iLike]: `%${search}%`,
      },
    }))
    where = {
      [Op.or]: conditions,
    }
  }

  const { offset = 0, limit = 1 } = req.query

  const allStations = await Station.findAndCountAll({
    offset: offset,
    limit: limit,
    where,
    attributes: {
      exclude: ['FID', 'createdAt', 'updatedAt'],
    },
  })

  let cursor = 0

  cursor += Number(offset) + allStations.rows.length

  if (cursor >= allStations.count) {
    cursor = undefined
  }

  res.status(200).json({ allStations, nextCursor: cursor })
})

route.get('/:id', async (req, res) => {
  const stationExists = await Station.findOne({
    where: {
      ID: req.params.id,
    },
    attributes: [
      'Nimi',
      'Name',
      'Namn',
      'Osoite',
      'Adress',
      [Sequelize.fn('COUNT', Sequelize.col('departures')), 'departures_count'],
      [Sequelize.fn('COUNT', Sequelize.col('returns')), 'returns_count'],
    ],
    include: [
      {
        model: Journey,
        as: 'departures',
        where: {
          Departure_station_id: req.params.id,
        },
        attributes: [],
        required: false,
      },
      {
        model: Journey,
        as: 'returns',
        where: {
          Return_station_id: req.params.id,
        },
        attributes: [],
        required: false,
      },
    ],
    group: ['station.FID'],
  })

  if (!stationExists)
    return res.status(404).json({ error: 'Station doesnt exist' })

  return res.status(200).json(stationExists)
})
module.exports = route
