const route = require('express').Router()
const path = require('path')

const parseCSV = require('../validators/validateCSV')

const validateJourney = require('../validators/validateJourney')

const filePath = path.resolve(__dirname, '../__test__/files/testfile_trips.csv')

route.post('/', async (req, res) => {
  const result = await parseCSV(filePath, validateJourney)
  console.log(result)
  res.status(200).json('Testing add trip endpoint')
})

module.exports = route
