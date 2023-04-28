function validateCSV(data, validator) {
  const fs = require('fs')
  const csv = require('csv-parser')

  return new Promise((resolve, reject) => {
    const result = []

    fs.createReadStream(data)
      .pipe(csv())
      .on('data', (row) => {
        result.push(row)
      })
      .on('end', () => {
        resolve(result)
      })
      .on('error', (err) => {
        reject(err)
      })
  })
}
module.exports = { validateCSV }
