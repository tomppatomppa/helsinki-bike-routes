const route = require('express').Router()

route.post('/', async (req, res) => {
  res.status(200).json('Testing add trip endpoint')
})

module.exports = route
