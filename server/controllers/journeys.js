const route = require('express').Router()
const path = require('path')

const parseCSV = require('../validators/parseCSV')

const validateJourney = require('../validators/validateJourney')

const filePath = path.resolve(
  __dirname,
  '../__test__/files/testfile_journeys.csv'
)

route.post('/add-many', async (req, res) => {
  const result = await parseCSV(filePath, validateJourney)
  console.log(result)
  res.status(200).json('api/journeys/add-many endpoint')
})

module.exports = route
