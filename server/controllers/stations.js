const route = require('express').Router()
const path = require('path')
const upload = require('../middleware/upload')
const parseCSV = require('../utils/parsers/parseCSV')

const validateStation = require('../utils/validators/validateStation')
const deleteTmpFile = require('../middleware/deleteTmpFile')

const { Station, Journey } = require('../models/index')

const { Op, Sequelize } = require('sequelize')

const stationsQueryValidator = require('../utils/validators/stationsQueryValidator')
const { validationResult } = require('express-validator')

route.post('/add-many', upload.single('file'), async (req, res) => {
  const filePath = path.resolve(__dirname, `../${req.file.path}`)

  const result = await parseCSV(filePath, validateStation)

  const errors = []

  const savedStations = await Station.bulkCreate(result, {
    ignoreDuplicates: true,
    validate: true,
  }).catch((error) => errors.push(error))

  deleteTmpFile(filePath)
  res.status(200).json({ stationsAdded: savedStations?.length | 0, errors })
})

route.post('/add-single', async (req, res) => {
  const result = await Station.create({ ...req.body })

  res.status(200).json(result)
})

route.get('/', stationsQueryValidator(), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
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

  const { offset = 0, limit } = req.query

  const allStations = await Station.findAndCountAll({
    offset: offset,
    limit: limit,
    where,
    attributes: {
      exclude: [
        'FID',
        'createdAt',
        'updatedAt',
        'Kaupunki',
        'Stad',
        'Operaattor',
        'Kapasiteet',
      ],
    },
  })

  let cursor = 0

  cursor += Number(offset) + allStations.rows.length

  if (cursor >= allStations.count) {
    cursor = undefined
  }

  res.status(200).json({ ...allStations, nextCursor: cursor })
})

route.get('/:id', async (req, res) => {
  const { startDate = '2000-01-01', endDate = '2100-12-31' } = req.query

  const between = `BETWEEN CAST('${startDate}' AS timestamp with time zone) AND CAST('${endDate}' AS timestamp with time zone)`
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
      [
        Sequelize.literal(
          `(SELECT COUNT(*) FROM journeys WHERE journeys."Departure_station_id" = "station"."ID" AND journeys."Departure" ${between})`
        ),
        'departures_count',
      ],
      [
        Sequelize.literal(
          `(SELECT COUNT(*) FROM journeys WHERE journeys."Return_station_id" = "station"."ID" AND journeys."Return" ${between})`
        ),
        'returns_count',
      ],
      [
        Sequelize.literal(
          `(SELECT SUM(journeys."Covered_distance_m") / COUNT(*) FROM journeys WHERE journeys."Departure_station_id" = "station"."ID" AND journeys."Departure" ${between})`
        ),
        'average_distance_departures',
      ],
      [
        Sequelize.literal(
          `(SELECT SUM(journeys."Covered_distance_m") / COUNT(*) FROM journeys WHERE journeys."Return_station_id" = "station"."ID" AND journeys."Return" ${between})`
        ),
        'average_distance_returns',
      ],
      [
        Sequelize.literal(
          `(SELECT SUM(journeys."Covered_distance_m") / COUNT(*) FROM journeys WHERE journeys."Return_station_id" = "station"."ID" AND journeys."Return" ${between})`
        ),
        'average_distance_returns',
      ],
      [
        Sequelize.literal(`(
        SELECT ARRAY_AGG(CONCAT(s."Name", ' Count: ', subquery."count"))
        FROM (
          SELECT j."Return_station_id", COUNT(*) AS "count"
          FROM Journeys AS j
          WHERE j."Departure_station_id" = "station"."ID"
          AND j."Return" ${between}
          GROUP BY j."Return_station_id"
          ORDER BY COUNT(j."Return_station_id") DESC
          LIMIT 5
        ) AS subquery
        JOIN "stations" AS s ON s."ID" = subquery."Return_station_id"
      )`),
        'most_common_return_stations',
      ],
      [
        Sequelize.literal(`(
        SELECT ARRAY_AGG(CONCAT(s."Name", ' Count: ', subquery."count"))
        FROM (
          SELECT j."Departure_station_id", COUNT(*) AS "count"
          FROM Journeys AS j
          WHERE j."Return_station_id" = "station"."ID"
          AND j."Departure" ${between}
          GROUP BY j."Departure_station_id"
          ORDER BY COUNT(j."Departure_station_id") DESC
          LIMIT 5
        ) AS subquery
        JOIN "stations" AS s ON s."ID" = subquery."Departure_station_id"
      )`),
        'most_common_departure_stations',
      ],
    ],
  })

  if (!stationExists)
    return res.status(404).json({ error: 'Station doesnt exist' })

  return res.status(200).json(stationExists)
})

module.exports = route
