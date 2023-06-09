const route = require('express').Router()
const path = require('path')
const upload = require('../middleware/upload')
const parseCSV = require('../utils/parsers/parseCSV')

const validateStation = require('../utils/validators/validateStation')
const deleteTmpFile = require('../middleware/deleteTmpFile')

const { Station } = require('../models/index')
const { Op, Sequelize } = require('sequelize')

const {
  validateStationsQueryParams,
  validateStationIdQueryParams,
} = require('../utils/validators/stationsQueryValidators')
const { validationResult } = require('express-validator')

route.post('/add-many', upload.single('file'), async (req, res) => {
  const filePath = path.resolve(__dirname, `../${req.file.path}`)

  const result = await parseCSV(filePath, validateStation)
  // Exclude FID from stations when using bulkCreate
  // This ensures that the primary key starts from the correct
  // index when adding a single station
  const stationsWithoutFID = result.map((station) => {
    const { FID, ...rest } = station
    return rest
  })

  const savedStations = await Station.bulkCreate(stationsWithoutFID, {
    validate: true,
    ignoreDuplicates: true,
  })

  deleteTmpFile(filePath)
  res.status(200).json({ stationsAdded: savedStations?.length | 0 })
})

route.post('/add-single', async (req, res) => {
  const result = await Station.create({ ...req.body })
  res.status(200).json(result)
})

route.get('/names', async (req, res) => {
  const allStationNamesAndId = await Station.findAll({
    attributes: ['ID', 'Name'],
  })
  res.status(200).json(allStationNamesAndId)
})

route.get('/', validateStationsQueryParams(), async (req, res) => {
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

  const { offset, limit } = req.query

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

route.get('/:id', validateStationIdQueryParams(), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { startDate, endDate } = req.query

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
          `(SELECT COUNT(*) FROM journeys 
          WHERE journeys."Departure_station_id" = "station"."ID" 
          AND journeys."Departure" ${between})`
        ),
        'departures_count',
      ],
      [
        Sequelize.literal(
          `(SELECT COUNT(*) FROM journeys 
          WHERE journeys."Return_station_id" = "station"."ID" 
          AND journeys."Return" ${between})`
        ),
        'returns_count',
      ],
      [
        Sequelize.literal(
          `(SELECT SUM(journeys."Covered_distance_m") / 
          COUNT(*) FROM journeys 
          WHERE journeys."Departure_station_id" = "station"."ID" 
          AND journeys."Departure" ${between})`
        ),
        'average_distance_departures',
      ],
      [
        Sequelize.literal(
          `(SELECT SUM(journeys."Covered_distance_m") / 
          COUNT(*) FROM journeys 
          WHERE journeys."Return_station_id" = "station"."ID" 
          AND journeys."Return" ${between})`
        ),
        'average_distance_returns',
      ],
      [
        Sequelize.literal(
          `(SELECT SUM(journeys."Covered_distance_m") / 
          COUNT(*) FROM journeys 
          WHERE journeys."Return_station_id" = "station"."ID" 
          AND journeys."Return" ${between})`
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

route.delete('/:id', async (req, res) => {
  const { id } = req.params
  const station = await Station.findOne({
    where: {
      ID: id,
    },
  })

  if (!station) {
    return res
      .status(404)
      .json({ error: `Station with the ID ${id} doesn't exist` })
  }
  await station.destroy()

  res.status(200).json(`Deleted Station ${id}`)
})

module.exports = route
