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

  if (isNaN(trimmed[validKey[0]]) || trimmed[validKey[0]] < 10) return false

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
    parseInt(trimmed['Departure station id']) < 1
  ) {
    return false
  }

  if (isNaN(trimmed['Duration (sec.)']) || trimmed['Duration (sec.)'] < 600)
    return false

  return true
}

module.exports = validateJourney
