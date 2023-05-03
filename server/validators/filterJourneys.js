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

module.exports = filterJourneys
