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

module.exports = {
  convertSpaceToUnderscore,
  removeParethesis,
  removeDot,
  filterJourneys,
}
