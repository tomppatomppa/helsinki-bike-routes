const route = require('express').Router()
const path = require('path')

const { validateCSV } = require('../validators/validateCSV')
const tripValidator = require('../validators/tripValidator')

const filePath = path.resolve(__dirname, '../__test__/files/testfile_trips.csv')

route.post('/', async (req, res) => {
  const result = await validateCSV(filePath, tripValidator)
  console.log(result)
  res.status(200).json('Testing add trip endpoint')
})

module.exports = route
