const parseRow = require('../utils/parsers/parseRow')
function parseCSV(data, validatorFn) {
  const fs = require('fs')
  const csv = require('csv-parser')

  return new Promise((resolve, reject) => {
    const result = []

    fs.createReadStream(data)
      .pipe(csv())
      .on('data', (row) => {
        if (!validatorFn) {
          result.push(row)
        } else if (validatorFn(row)) {
          result.push(parseRow(row))
        }
      })
      .on('end', () => {
        resolve(result)
      })
      .on('error', (err) => {
        reject(err)
      })
  })
}
module.exports = parseCSV
