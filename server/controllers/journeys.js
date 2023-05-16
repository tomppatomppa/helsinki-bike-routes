const route = require('express').Router()
const path = require('path')
const upload = require('../middleware/upload')

const { Op } = require('sequelize')

const { Journey } = require('../models/index')

const { validationResult } = require('express-validator')

const journeysQueryValidator = require('../utils/validators/journeysQueryValidator')
const validateJourney = require('../utils/validators/validateJourney')
const deleteTmpFile = require('../middleware/deleteTmpFile')
const parseCSV = require('../utils/parsers/parseCSV')
const { filterJourneys, chunk } = require('../utils/helpers')

const clients = new Set()

route.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.flushHeaders()
  clientResponse = res
  // Add the response object to the clients set
  clients.add(res)

  // Remove the response object from the clients set when the connection is closed
  req.on('close', () => {
    clients.delete(res)
  })
})
// Send SSE event to the client
const sendSSE = (message) => {
  clients.forEach((client) => {
    client.write(`data: ${message}\n\n`)
  })
}

route.post('/add-many', upload.single('file'), async (req, res) => {
  const filePath = path.resolve(__dirname, `../${req.file.path}`)

  const parsedJourneys = await parseCSV(filePath, validateJourney)
  //Filter out journeys with non existing Station ID's

  const filteredJourneys = await filterJourneys(parsedJourneys)

  if (filteredJourneys.length === 0) {
    return res.status(400).json({ error: 'No valid journeys' })
  }

  let index = 0
  const chunkSize = 20000
  await chunk(filteredJourneys, chunkSize).reduce((promise, chunk) => {
    return promise.then(() => {
      const message = `${(index / (filteredJourneys.length / chunkSize)) * 100}`
      sendSSE(message)
      index = index + 1
      return Journey.bulkCreate(chunk, { ignoreDuplicates: true })
    })
  }, Promise.resolve())

  deleteTmpFile(filePath)
  res.status(200).json({ addedJourneys: filteredJourneys.length })
})

route.get('/', journeysQueryValidator(), async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { offset, limit } = req.query

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
    attributes: {
      exclude: ['Departure', 'Return', 'createdAt', 'updatedAt'],
    },
  })

  let cursor = 0

  cursor += Number(offset) + allJourneys.rows.length

  if (cursor >= allJourneys.count) {
    cursor = undefined
  }

  res.status(200).json({ ...allJourneys, nextCursor: cursor })
})

module.exports = route
