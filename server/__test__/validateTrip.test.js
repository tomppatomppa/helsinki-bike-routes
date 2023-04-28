const path = require('path')

const { validateCSV } = require('../validators/validateCSV')
const tripValidator = require('../validators/tripValidator')
const filePath = path.resolve(__dirname, './files/testfile_trips.csv')

const config = require('./config')
const validCsvRow = config.tripValidator.validCsvRow

describe('Test tripValidator fucntion', () => {
  test('tripValidator returns true for trip duration > 600 seconds', async () => {
    expect(tripValidator(validCsvRow)).toBe(true)
  })
  test('tripValidator returns false for trip duration < 600 seconds', async () => {
    expect(tripValidator({ ...validCsvRow, 'Duration (sec.)': '599' })).toBe(
      false
    )
  })
})
