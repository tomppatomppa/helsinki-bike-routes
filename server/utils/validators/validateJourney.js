const isNonEmptyString = require('./isNonEmptyString')
const isValidPositiveInteger = require('./isValidPositiveInteger')

const MIN_JOURNEY_DURATION = 600
const MIN_COVERED_DISTANCE = 10

const DEPARTURE_DATE = 'Departure'
const RETURN_DATE = 'Return'
const DEPARTURE_STATION_ID = 'Departure station id'
const DEPARTURE_STATION_NAME = 'Departure station name'
const RETURN_STATION_NAME = 'Return station name'
const RETURN_STATION_ID = 'Return station id'
const COVERED_DISTANCE = 'Covered distance (m)'
const JOURNEY_DURATION = 'Duration (sec.)'

const VALID_KEYS = [
  DEPARTURE_DATE,
  RETURN_DATE,
  DEPARTURE_STATION_ID,
  DEPARTURE_STATION_NAME,
  RETURN_STATION_ID,
  RETURN_STATION_NAME,
  COVERED_DISTANCE,
  JOURNEY_DURATION,
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

  // Validate departure station ID and return station ID
  if (
    !isValidPositiveInteger(trimmedRow[DEPARTURE_STATION_ID]) ||
    !isValidPositiveInteger(trimmedRow[RETURN_STATION_ID])
  ) {
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
    !isNonEmptyString(trimmedRow[DEPARTURE_STATION_NAME]) ||
    !isNonEmptyString(trimmedRow[RETURN_STATION_NAME])
  ) {
    return false
  }

  return true
}

module.exports = validateJourney
