const route = require('express').Router()
const path = require('path')

const parseCSV = require('../validators/parseCSV')

const validateStation = require('../validators/validateStation')

const filePath = path.resolve(
  __dirname,
  '../__test__/files/testfile_stations.csv'
)

route.post('/', async (req, res) => {
  const result = await parseCSV(filePath, validateStation)

  res.status(200).json('Testing add trip endpoint')
})

module.exports = route
