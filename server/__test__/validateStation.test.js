const validateStation = require('../validators/validateStation')

const config = require('./config')
const validCsvRow = config.validateStation.validCsvRow

describe('Test for validateStation', () => {
  test('Too large value for X coordinate should return false', () => {
    expect(validateStation({ ...validCsvRow, x: 181 })).toBe(false)
  })
  test('Too small value for X coordinate should return false', () => {
    expect(validateStation({ ...validCsvRow, x: -181 })).toBe(false)
  })
})
