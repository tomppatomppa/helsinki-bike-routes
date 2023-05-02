const validateStation = require('../validators/validateStation')

const config = require('./config')
const validCsvRow = config.validateStation.validCsvRow

describe('Test for validateStation', () => {
  describe('Validate FID', () => {
    test('returns false if FID is less than 1', () => {
      expect(validateStation({ ...validCsvRow, FID: 0 })).toBe(false)
    })
    test('returns false if FID is not Integer type', () => {
      expect(validateStation({ ...validCsvRow, FID: 'notanINT' })).toBe(false)
    })
    test('returns false if FID is null', () => {
      expect(validateStation({ ...validCsvRow, FID: null })).toBe(false)
    })
    test('returns false if FID is undefined', () => {
      expect(validateStation({ ...validCsvRow, FID: undefined })).toBe(false)
    })
    test('returns false if FID is float', () => {
      expect(validateStation({ ...validCsvRow, FID: 2.2 })).toBe(false)
    })
    test('returns false if FID is string float', () => {
      expect(validateStation({ ...validCsvRow, FID: '2.2' })).toBe(false)
    })
    test('returns true if FID is Integer as string', () => {
      expect(validateStation({ ...validCsvRow, FID: '1' })).toBe(true)
    })
    test('returns true if FID is valid', () => {
      expect(validateStation(validCsvRow)).toBe(true)
    })
  })
  describe('Validate ID', () => {
    test('returns false if ID is less than 1', () => {
      expect(validateStation({ ...validCsvRow, ID: 0 })).toBe(false)
    })
    test('returns false if ID is not Integer type', () => {
      expect(validateStation({ ...validCsvRow, ID: 'notanINT' })).toBe(false)
    })
    test('returns false if ID is null', () => {
      expect(validateStation({ ...validCsvRow, ID: null })).toBe(false)
    })
    test('returns false if ID is undefined', () => {
      expect(validateStation({ ...validCsvRow, ID: undefined })).toBe(false)
    })
    test('returns false if ID is float', () => {
      expect(validateStation({ ...validCsvRow, ID: 2.2 })).toBe(false)
    })
    test('returns false if ID is string float', () => {
      expect(validateStation({ ...validCsvRow, ID: '2.2' })).toBe(false)
    })
    test('returns true if ID is Integer as string', () => {
      expect(validateStation({ ...validCsvRow, ID: '1' })).toBe(true)
    })
    test('returns true if ID is valid', () => {
      expect(validateStation(validCsvRow)).toBe(true)
    })
  })

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
