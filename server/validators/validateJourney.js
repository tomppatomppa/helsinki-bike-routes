const MIN_STATION_ID = 1
const MIN_JOURNEY_DURATION = 600
const MIN_COVERED_DISTANCE = 10
function validateJourney(row) {
  const validKey = [
    'Covered distance (m)',
    'Departure station id',
    'Departure station name',
    'Duration (sec.)',
    'Return',
    'Return station id',
    'Return station name',
    'Departure',
  ]

  const trimmed = Object.fromEntries(
    Object.entries(row).map(([key, value]) => [key.trim(), value])
  )
  const rowKeys = Object.keys(trimmed)

  if (!rowKeys.every((field) => validKey.includes(field))) {
    return false
  }

  if (
    isNaN(trimmed[validKey[0]]) ||
    trimmed[validKey[0]] < MIN_COVERED_DISTANCE
  ) {
    return false
  }

  if (
    isNaN(Date.parse(trimmed['Departure'])) ||
    isNaN(Date.parse(trimmed['Return']))
  ) {
    return false
  }

  if (Date.parse(trimmed['Departure']) > Date.parse(trimmed['Return'])) {
    return false
  }

  if (
    isNaN(trimmed['Departure station id']) ||
    parseInt(trimmed['Departure station id']) < MIN_STATION_ID
  ) {
    return false
  }

  if (
    isNaN(trimmed['Duration (sec.)']) ||
    trimmed['Duration (sec.)'] < MIN_JOURNEY_DURATION
  )
    return false

  return true
}

module.exports = validateJourney
