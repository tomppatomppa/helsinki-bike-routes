function isValidPositiveInteger(value) {
  return Number.isInteger(Number(value)) && Number(value) > 0
}

module.exports = isValidPositiveInteger
