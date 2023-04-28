function validateCSV(data, validator) {
  const fs = require('fs')
  const csv = require('csv-parser')

  const result = []

  fs.createReadStream(data)
    .pipe(csv())
    .on('data', (row) => {
      result.push(row)
    })
    .on('end', () => {
      console.log(result)
    })
  return result
}
module.exports = { validateCSV }
