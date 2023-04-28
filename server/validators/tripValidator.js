function tripValidator(row) {
  const validCsvRowKeys = [
    'Covered distance (m)',
    'Departure station id',
    'Departure station name',
    'Duration (sec.)',
    'Return',
    'Return station id',
    'Return station name',
    'Departure',
  ]

  const rowKeys = Object.keys(row)

  if (!rowKeys.every((field) => validCsvRowKeys.includes(field.trim()))) {
    return false
  }
  if (isNaN(row[validCsvRowKeys[3]]) || row[validCsvRowKeys[3]] < 600)
    return false

  if (isNaN(row[validCsvRowKeys[0]]) || row[validCsvRowKeys[0]] < 10)
    return false

  return true
}

module.exports = tripValidator
