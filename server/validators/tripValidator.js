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
  if (!validCsvRowKeys.every((field) => rowKeys.includes(field))) {
    return false
  }
  if (row[validCsvRowKeys[3]] < 600) return false
  return true
}

module.exports = tripValidator
