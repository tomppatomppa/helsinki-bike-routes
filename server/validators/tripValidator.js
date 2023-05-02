function tripValidator(row) {
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

  const trimmedRow = Object.fromEntries(
    Object.entries(row).map(([key, value]) => [key.trim(), value])
  )
  const rowKeys = Object.keys(trimmedRow)

  if (!rowKeys.every((field) => validKey.includes(field))) {
    return false
  }

  if (isNaN(trimmedRow[validKey[0]]) || trimmedRow[validKey[0]] < 10)
    return false

  if (
    isNaN(Date.parse(trimmedRow['Departure'])) ||
    isNaN(Date.parse(trimmedRow['Return']))
  ) {
    return false
  }

  if (Date.parse(trimmedRow['Departure']) > Date.parse(trimmedRow['Return'])) {
    return false
  }

  if (
    isNaN(trimmedRow['Departure station id']) ||
    parseInt(trimmedRow['Departure station id']) < 1
  ) {
    return false
  }

  if (
    isNaN(trimmedRow['Duration (sec.)']) ||
    trimmedRow['Duration (sec.)'] < 600
  )
    return false

  return true
}

module.exports = tripValidator
