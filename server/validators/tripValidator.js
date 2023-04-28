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
  const trimmed = Object.fromEntries(
    Object.entries(row).map(([key, value]) => [key.trim(), value])
  )
  const rowKeys = Object.keys(trimmed)

  if (!rowKeys.every((field) => validKey.includes(field))) {
    return false
  }

  if (isNaN(trimmed[validKey[0]]) || trimmed[validKey[0]] < 10) return false

  if (
    isNaN(Date.parse(trimmed[validKey[7]])) ||
    isNaN(Date.parse(trimmed[validKey[4]]))
  ) {
    return false
  }

  if (isNaN(trimmed[validKey[3]]) || trimmed[validKey[3]] < 600) return false

  return true
}

module.exports = tripValidator
