function convertSpaceToUnderscore(obj) {
  const result = {}
  for (let key in obj) {
    let newKey = key.replace(/ /g, '_').trim()
    result[newKey] = obj[key]
  }
  return result
}

function removeParethesis(obj) {
  const result = {}
  for (let key in obj) {
    let newKey = key.replace(/[()]/g, '').trim()
    result[newKey] = obj[key]
  }
  return result
}

function removeDot(obj) {
  const result = {}
  for (let key in obj) {
    let newKey = key.replace(/[.]/g, '').trim()
    result[newKey] = obj[key]
  }
  return result
}

const { Station } = require('../models/index')
const { sequelize } = require('./database')

async function filterJourneys(journeys) {
  const allStations = await Station.findAll({
    attributes: ['ID'],
  })
  const stationIds = allStations.map((station) => station.ID.toString())

  return journeys.filter(
    (journey) =>
      stationIds.includes(journey.Departure_station_id) &&
      stationIds.includes(journey.Return_station_id)
  )
}
const getNextAvailableID = async () => {
  try {
    const query = 'SELECT COALESCE(MAX("ID"), 0) + 1 AS next_id FROM stations;'
    const result = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    })
    const nextID = result[0].next_id
    return nextID
  } catch (error) {
    console.error('Failed to get the next available ID:', error)
    throw error
  }
}
function chunk(array, size) {
  if (size < 1) throw new Error('Size must be positive')

  const result = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}

module.exports = {
  convertSpaceToUnderscore,
  removeParethesis,
  removeDot,
  filterJourneys,
  chunk,
  getNextAvailableID,
}
