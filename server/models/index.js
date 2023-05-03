const Station = require('./station')
const Journey = require('./journey')

Station.sync()
Journey.sync()

module.exports = { Station, Journey }
