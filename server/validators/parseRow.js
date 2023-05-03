const {
  convertSpaceToUnderscore,
  removeParethesis,
  removeDot,
} = require('../utils/helpers')

function parseRow(row) {
  const rowWithoutDots = removeDot(row)
  return convertSpaceToUnderscore(removeParethesis(rowWithoutDots))
}

module.exports = parseRow
