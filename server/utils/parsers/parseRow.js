const {
  convertSpaceToUnderscore,
  removeParethesis,
  removeDot,
} = require('../helpers')

function parseRow(row) {
  const rowWithoutDots = removeDot(row)
  const rowWithoutParenthesis = removeParethesis(rowWithoutDots)
  return convertSpaceToUnderscore(rowWithoutParenthesis)
}

module.exports = parseRow
