const {
  convertSpaceToUnderscore,
  removeParethesis,
} = require('../utils/helpers')

function parseRow(row) {
  return convertSpaceToUnderscore(removeParethesis(row))
}

module.exports = parseRow
