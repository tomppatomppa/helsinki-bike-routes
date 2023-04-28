const path = require('path')

const { validateCSV } = require('../validators/validateCSV')
const tripValidator = require('../validators/tripValidator')
const filePath = path.resolve(__dirname, './files/testfile_trips.csv')

const config = require('./config')
const validCsvRow = config.tripValidator.validCsvRow

describe('Test tripValidator fucntion', () => {
  describe('duration', () => {
    test('tripValidator returns true for trip duration > 600 seconds', () => {
      expect(tripValidator(validCsvRow)).toBe(true)
    })
    test('tripValidator returns false for trip duration < 600 seconds', () => {
      expect(tripValidator({ ...validCsvRow, 'Duration (sec.)': '599' })).toBe(
        false
      )
    })
  })
  describe('distance', () => {
    test('tripValidator returns true for trip distance > 10 meters', () => {
      expect(tripValidator(validCsvRow)).toBe(true)
    })
    test('tripValidator returns false for trip distance < 10 meters', () => {
      expect(tripValidator({ ...validCsvRow, 'Covered distance (m)': 9 })).toBe(
        false
      )
    })
  })
})
