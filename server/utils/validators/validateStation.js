const isString = require('./isString')
const isValidPositiveInteger = require('./isValidPositiveInteger')

const MAX_X_COORDINATE = 180
const MIN_X_COORDINATE = -180
const MAX_Y_COORDINATE = 90
const MIN_Y_COORDINATE = -90

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
  FID,
  ID,
  NAME_FI,
  NAME_SWE,
  NAME_EN,
  ADDRESS_FIN,
  ADDRESS_SWE,
  CITY_NAME_FIN,
  CITY_NAME_SWE,
  OPERAATTOR,
  KAPASITEET,
  X_COORDINATE,
  Y_COORDINATE,
]

function validateStation(row) {
  const trimmedRow = Object.fromEntries(
    Object.entries(row).map(([key, value]) => [key.trim(), value])
  )

  if (!Object.keys(trimmedRow).every((field) => VALID_KEYS.includes(field))) {
    return false
  }

  // Validate FID and ID
  if (
    !isValidPositiveInteger(trimmedRow[FID]) ||
    !isValidPositiveInteger(trimmedRow[ID])
  ) {
    return false
  }

  //Validate Nimi, Namn, Name
  if (
    !isString(trimmedRow[NAME_FI]) ||
    !isString(trimmedRow[NAME_SWE]) ||
    !isString(trimmedRow[NAME_EN])
  ) {
    return false
  }

  //Validate Osoite, Adress
  if (
    !isString(trimmedRow[ADDRESS_FIN]) ||
    !isString(trimmedRow[ADDRESS_SWE])
  ) {
    return false
  }

  //Validate Kapasiteet
  if (!isValidPositiveInteger(trimmedRow[KAPASITEET])) {
    return false
  }

  //Validate X coordinate
  if (
    isNaN(parseFloat(trimmedRow[X_COORDINATE])) ||
    parseFloat(trimmedRow[X_COORDINATE]) > MAX_X_COORDINATE ||
    parseFloat(trimmedRow[X_COORDINATE]) < MIN_X_COORDINATE
  ) {
    return false
  }

  //Validate Y coordinate
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
