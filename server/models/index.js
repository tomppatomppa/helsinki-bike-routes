const Station = require('./station')
const Journey = require('./journey')

Station.sync()
Journey.sync()

Station.hasMany(Journey, {
  foreignKey: 'Departure_station_id',
  as: 'departures',
  sourceKey: 'ID',
})
Journey.belongsTo(Station, {
  foreignKey: 'Departure_station_id',
  as: 'departureStation',
  targetKey: 'ID',
})
Station.hasMany(Journey, {
  foreignKey: 'Return_station_id',
  as: 'returns',
  sourceKey: 'ID',
})
Journey.belongsTo(Station, {
  foreignKey: 'Return_station_id',
  as: 'returnStation',
  targetKey: 'ID',
})

module.exports = { Station, Journey }
