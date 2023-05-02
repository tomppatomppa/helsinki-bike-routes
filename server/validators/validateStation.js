const MAX_X_COORDINATE = 180
const MIN_X_COORDINATE = -180
const MAX_Y_COORDINATE = 90
const MIN_Y_COORDINATE = -90

const X_COORDINATE = 'x'
const Y_COORDINATE = 'y'
const VALID_KEYS = [
  'FID',
  'ID',
  'Nimi',
  'Namn',
  'Name',
  'Osoite',
  'Adress',
  'Kaupunki',
  'Stad',
  'Operaattor',
  'Kapasiteet',
  'x',
  'y',
]

function validateStation(row) {
  const trimmedRow = Object.fromEntries(
    Object.entries(row).map(([key, value]) => [key.trim(), value])
  )

  if (!Object.keys(trimmedRow).every((field) => VALID_KEYS.includes(field))) {
    return false
  }

  if (
    !trimmedRow[X_COORDINATE] ||
    parseFloat(trimmedRow[X_COORDINATE]) > MAX_X_COORDINATE ||
    parseFloat(trimmedRow[X_COORDINATE]) < MIN_X_COORDINATE ||
    isNaN(trimmedRow[X_COORDINATE])
  ) {
    return false
  }
  if (
    !trimmedRow[Y_COORDINATE] ||
    parseFloat(trimmedRow[Y_COORDINATE]) > MAX_Y_COORDINATE ||
    parseFloat(trimmedRow[Y_COORDINATE]) < MIN_Y_COORDINATE ||
    isNaN(trimmedRow[Y_COORDINATE])
  ) {
    return false
  }

  return true
}

module.exports = validateStation
