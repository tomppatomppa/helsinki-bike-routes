const route = require('express').Router()
const path = require('path')

const parseCSV = require('../validators/parseCSV')

const validateStation = require('../validators/validateStation')

const filePath = path.resolve(
  __dirname,
  '../__test__/files/testfile_stations.csv'
)

route.post('/add-many', async (req, res) => {
  const result = await parseCSV(filePath, validateStation)
  console.log(result)
  res.status(200).json('Testing add-many stations endpoint')
})

module.exports = route
