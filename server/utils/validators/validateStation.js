const isFloat = require('./isFloat')
const isString = require('./isString')
const isPositiveInteger = require('./isPositiveInteger')

const MAX_X_COORDINATE = 180
const MIN_X_COORDINATE = -180
const MAX_Y_COORDINATE = 90
const MIN_Y_COORDINATE = -90

const MIN_FID = 1
const MIN_ID = 1
const FID = 'FID'
const ID = 'ID'
const NAME_FI = 'Nimi'
const NAME_SWE = 'Namn'
const NAME_EN = 'Name'
const ADDRESS_FIN = 'Osoite'
const ADDRESS_SWE = 'Adress'
const CITY_NAME_FIN = 'Kaupunki'
const CITY_NAME_SWE = 'Stad'
const OPERAATTOR = 'Operaattor'
const KAPASITEET = 'Kapasiteet'
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

  //Nimi, Namn, Name
  if (
    !isString(trimmedRow[NAME_FI]) ||
    !isString(trimmedRow[NAME_SWE]) ||
    !isString(trimmedRow[NAME_EN])
  ) {
    return false
  }

  //Osoite, Adress
  if (
    !isString(trimmedRow[ADDRESS_FIN]) ||
    !isString(trimmedRow[ADDRESS_SWE])
  ) {
    return false
  }

  // //Kaupunki can be empty but if not expect a string
  // if (
  //   isFloat(trimmedRow[CITY_NAME_FIN]) ||
  //   !isString(trimmedRow[CITY_NAME_FIN])
  // ) {
  //   return false
  // }
  // // Stad can be empty but if not expect a string
  // if (
  //   isFloat(trimmedRow[CITY_NAME_SWE]) ||
  //   !isString(trimmedRow[CITY_NAME_SWE])
  // ) {
  //   return false
  // }

  // //Operaattor
  // if (trimmedRow[OPERAATTOR] !== '' && !isString(trimmedRow[OPERAATTOR])) {
  //   return false
  // }

  //Kapasiteet should be a positive Integer
  if (!trimmedRow[KAPASITEET] || !isPositiveInteger(trimmedRow[KAPASITEET])) {
    return false
  }

  //X coordinate
  if (
    isNaN(parseFloat(trimmedRow[X_COORDINATE])) ||
    parseFloat(trimmedRow[X_COORDINATE]) > MAX_X_COORDINATE ||
    parseFloat(trimmedRow[X_COORDINATE]) < MIN_X_COORDINATE
  ) {
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
