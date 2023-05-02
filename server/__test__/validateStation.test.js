const validateStation = require('../validators/validateStation')

const config = require('./config')
const validCsvRow = config.validateStation.validCsvRow

describe('Test for validateStation', () => {
  describe('Validate x coordinate', () => {
    test('Too large value for X coordinate should return false', () => {
      expect(validateStation({ ...validCsvRow, x: 181 })).toBe(false)
    })
    test('Too small value for X coordinate should return false', () => {
      expect(validateStation({ ...validCsvRow, x: -181 })).toBe(false)
    })
    test('Should return false when X coordinate is not a number', () => {
      expect(validateStation({ ...validCsvRow, x: 'notanumber' })).toBe(false)
    })
    test('Should return false when X coordinate is null', () => {
      expect(validateStation({ ...validCsvRow, x: null })).toBe(false)
    })
    test('Should return false when X coordinate is undefined', () => {
      expect(validateStation({ ...validCsvRow, x: undefined })).toBe(false)
    })
    test('Should return true when X coordinate is valid', () => {
      expect(validateStation(validCsvRow)).toBe(true)
    })
  })
  describe('Validate y coordinate', () => {
    test('Too large value for Y coordinate should return false', () => {
      expect(validateStation({ ...validCsvRow, y: 91 })).toBe(false)
    })
    test('Too small value for Y coordinate should return false', () => {
      expect(validateStation({ ...validCsvRow, y: -91 })).toBe(false)
    })
    test('Should return false when Y coordinate is not a number', () => {
      expect(validateStation({ ...validCsvRow, y: 'notanumber' })).toBe(false)
    })
    test('Should return false when Y coordinate is null', () => {
      expect(validateStation({ ...validCsvRow, y: null })).toBe(false)
    })
    test('Should return false when Y coordinate is undefined', () => {
      expect(validateStation({ ...validCsvRow, y: undefined })).toBe(false)
    })
    test('Should return true when Y coordinate is valid', () => {
      expect(validateStation(validCsvRow)).toBe(true)
    })
  })
})
