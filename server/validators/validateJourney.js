const MIN_STATION_ID = 1
const MIN_JOURNEY_DURATION = 600
const MIN_COVERED_DISTANCE = 10

const COVERED_DISTANCE = 'Covered distance (m)'
const DEPARTURE_DATE = 'Departure'
const RETURN_DATE = 'Return'
const DEPARTURE_STATION_ID = 'Departure station id'
const JOURNEY_DURATION = 'Duration (sec.)'

const validKeys = [
  'Covered distance (m)',
  'Departure station id',
  'Departure station name',
  'Duration (sec.)',
  'Return',
  'Return station id',
  'Return station name',
  'Departure',
]

function validateJourney(row) {
  const trimmedRow = Object.fromEntries(
    Object.entries(row).map(([key, value]) => [key.trim(), value])
  )

  if (!Object.keys(trimmedRow).every((field) => validKeys.includes(field))) {
    return false
  }

  if (
    isNaN(trimmedRow[COVERED_DISTANCE]) ||
    trimmedRow[COVERED_DISTANCE] < MIN_COVERED_DISTANCE
  ) {
    return false
  }

  if (
    isNaN(Date.parse(trimmedRow[DEPARTURE_DATE])) ||
    isNaN(Date.parse(trimmedRow[RETURN_DATE]))
  ) {
    return false
  }

  if (
    Date.parse(trimmedRow[DEPARTURE_DATE]) > Date.parse(trimmedRow[RETURN_DATE])
  ) {
    return false
  }

  if (
    isNaN(trimmedRow[DEPARTURE_STATION_ID]) ||
    parseInt(trimmedRow[DEPARTURE_STATION_ID]) < MIN_STATION_ID
  ) {
    return false
  }

  if (
    isNaN(trimmedRow[JOURNEY_DURATION]) ||
    trimmedRow[JOURNEY_DURATION] < MIN_JOURNEY_DURATION
  )
    return false

  return true
}

module.exports = validateJourney
