const isString = require('./isString')
const isValidPositiveInteger = require('./isValidPositiveInteger')

const MIN_JOURNEY_DURATION = 600
const MIN_COVERED_DISTANCE = 10

const COVERED_DISTANCE = 'Covered distance (m)'
const DEPARTURE_DATE = 'Departure'
const RETURN_DATE = 'Return'
const DEPARTURE_STATION_ID = 'Departure station id'
const JOURNEY_DURATION = 'Duration (sec.)'
const RETURN_STATION_NAME = 'Return station name'
const DEPARTURE_STATION_NAME = 'Departure station name'

const VALID_KEYS = [
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

  // Validate if all required fields are present
  if (!Object.keys(trimmedRow).every((field) => VALID_KEYS.includes(field))) {
    return false
  }

  //Validate Covered_distance_m
  if (
    !isValidPositiveInteger(trimmedRow[COVERED_DISTANCE]) ||
    trimmedRow[COVERED_DISTANCE] < MIN_COVERED_DISTANCE
  ) {
    return false
  }

  // Validate departure and return date
  if (
    isNaN(Date.parse(trimmedRow[DEPARTURE_DATE])) ||
    isNaN(Date.parse(trimmedRow[RETURN_DATE]))
  ) {
    return false
  }

  // Validate departure date is before return date
  if (
    Date.parse(trimmedRow[DEPARTURE_DATE]) > Date.parse(trimmedRow[RETURN_DATE])
  ) {
    return false
  }

  // Validate departure station ID
  if (!isValidPositiveInteger(trimmedRow[DEPARTURE_STATION_ID])) {
    return false
  }

  // Validate journey duration
  if (
    !isValidPositiveInteger(trimmedRow[JOURNEY_DURATION]) ||
    trimmedRow[JOURNEY_DURATION] < MIN_JOURNEY_DURATION
  )
    return false

  // Validate station name fields
  if (
    !isString(trimmedRow[DEPARTURE_STATION_NAME]) ||
    !isString(trimmedRow[RETURN_STATION_NAME])
  ) {
    return false
  }

  return true
}

module.exports = validateJourney
