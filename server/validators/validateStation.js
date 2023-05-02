const isFloat = require('./isFloat')

const MAX_X_COORDINATE = 180
const MIN_X_COORDINATE = -180
const MAX_Y_COORDINATE = 90
const MIN_Y_COORDINATE = -90

const MIN_FID = 1
const MIN_ID = 1
const FID = 'FID'
const ID = 'ID'
const NAME_FI = 'Nimi'
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
  //FID
  if (
    parseInt(trimmedRow[FID]) < MIN_FID ||
    isFloat(Number(trimmedRow[FID])) ||
    isNaN(parseInt(trimmedRow[FID]))
  ) {
    return false
  }
  //ID
  if (
    parseInt(trimmedRow[ID]) < MIN_ID ||
    isFloat(Number(trimmedRow[ID])) ||
    isNaN(parseInt(trimmedRow[ID]))
  ) {
    return false
  }
  //Nimi
  if (
    typeof trimmedRow[NAME_FI] !== 'string' ||
    !isNaN(Number(trimmedRow[NAME_FI]))
  ) {
    return false
  }
  if (
    isNaN(parseFloat(trimmedRow[X_COORDINATE])) ||
    parseFloat(trimmedRow[X_COORDINATE]) > MAX_X_COORDINATE ||
    parseFloat(trimmedRow[X_COORDINATE]) < MIN_X_COORDINATE
  ) {
    //X coordinate
    return false
  }
  //Y coordinate
  if (
    isNaN(parseFloat(trimmedRow[Y_COORDINATE])) ||
    parseFloat(trimmedRow[Y_COORDINATE]) > MAX_Y_COORDINATE ||
    parseFloat(trimmedRow[Y_COORDINATE]) < MIN_Y_COORDINATE
  ) {
    return false
  }

  return true
}

module.exports = validateStation
