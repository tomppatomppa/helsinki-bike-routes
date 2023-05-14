const validateJourney = require('../../utils/validators/validateJourney')

const config = require('../config')
const validCsvRow = config.validateJourney.validCsvRow
const rowWithoutDuration = config.validateJourney.rowWithoutDuration
const rowWithoutDistance = config.validateJourney.rowWithoutDistance

describe('Test validateJourney fucntion', () => {
  describe('Duration', () => {
    test('validateJourney returns true for trip duration > 600 seconds', () => {
      expect(validateJourney(validCsvRow)).toBe(true)
    })
    test('validateJourney returns false for trip duration < 600 seconds', () => {
      expect(
        validateJourney({ ...validCsvRow, 'Duration (sec.)': '599' })
      ).toBe(false)
    })
    test('validateJourney returns false for trip duration is undefined', () => {
      expect(
        validateJourney({ ...validCsvRow, 'Duration (sec.)': undefined })
      ).toBe(false)
    })
    test('validateJourney returns false for trip duration is NaN', () => {
      expect(
        validateJourney({ ...validCsvRow, 'Duration (sec.)': 'notanumber' })
      ).toBe(false)
    })
    test('validateJourney returns false for trip duration is null', () => {
      expect(validateJourney({ ...validCsvRow, 'Duration (sec.)': null })).toBe(
        false
      )
    })
    test('validateJourney returns false when duration doesnt exists', () => {
      expect(validateJourney(rowWithoutDuration)).toBe(false)
    })
    test('validateJourney returns false when duration is a float', () => {
      expect(
        validateJourney({ ...validCsvRow, 'Duration (sec.)': 7791.67 })
      ).toBe(false)
    })
  })

  describe('Distance', () => {
    test('validateJourney returns false when trip distance is float', () => {
      expect(
        validateJourney({ ...validCsvRow, 'Covered distance (m)': 7729.09 })
      ).toBe(false)
    })
    test('validateJourney returns true for trip distance > 10 meters', () => {
      expect(validateJourney(validCsvRow)).toBe(true)
    })
    test('validateJourney returns false for trip distance < 10 meters', () => {
      expect(
        validateJourney({ ...validCsvRow, 'Covered distance (m)': 9 })
      ).toBe(false)
    })
    test('validateJourney returns false when distance is undefined', () => {
      expect(
        validateJourney({ ...validCsvRow, 'Covered distance (m)': undefined })
      ).toBe(false)
    })
    test('validateJourney returns false when distance is NaN', () => {
      expect(
        validateJourney({
          ...validCsvRow,
          'Covered distance (m)': 'notanumber',
        })
      ).toBe(false)
    })
    test('validateJourney returns false when distance is empty string', () => {
      expect(
        validateJourney({
          ...validCsvRow,
          'Covered distance (m)': 'notanumber',
        })
      ).toBe(false)
    })
    test('validateJourney returns false when distance is null', () => {
      expect(
        validateJourney({ ...validCsvRow, 'Covered distance (m)': null })
      ).toBe(false)
    })
    test('validateJourney returns false when distance doesnt exist', () => {
      expect(validateJourney(rowWithoutDistance)).toBe(false)
    })
  })

  describe('Test Dates', () => {
    test('should return false with Departure as an invalid date', () => {
      expect(
        validateJourney({ ...validCsvRow, Departure: '2021-13-31T23:52:03' })
      ).toBe(false)
    })
    test('should return false with Return as an invalid date', () => {
      expect(
        validateJourney({ ...validCsvRow, Return: '203-13-31T23:52:03' })
      ).toBe(false)
    })
    test('should return false if departure later than arrival', () => {
      expect(
        validateJourney({
          ...validCsvRow,
          Departure: '2021-05-31T23:56:59',
          Return: '2021-05-31T23:55:59',
        })
      ).toBe(false)
    })
  })
  describe('Departure station id', () => {
    test('Id should return false if not a positive integer', () => {
      expect(
        validateJourney({
          ...validCsvRow,
          'Departure station id': 0,
        })
      ).toBe(false)
    })
    test('Id should return false if a negative integer', () => {
      expect(
        validateJourney({
          ...validCsvRow,
          'Departure station id': -1,
        })
      ).toBe(false)
    })
    test('Id should return true with a positive integer', () => {
      expect(
        validateJourney({
          ...validCsvRow,
          'Departure station id': 1,
        })
      ).toBe(true)
    })
  })
  describe('Departure and Return station names', () => {
    test('Should return false when Departure station name is not a string', () => {
      expect(
        validateJourney({
          ...validCsvRow,
          'Departure station name': 1,
        })
      ).toBe(false)
    })
    test('Should return false when Departure station name is null', () => {
      expect(
        validateJourney({
          ...validCsvRow,
          'Departure station name': null,
        })
      ).toBe(false)
    })
    test('Should return false when Departure station name is undefined', () => {
      expect(
        validateJourney({
          ...validCsvRow,
          'Departure station name': undefined,
        })
      ).toBe(false)
    })
    test('Should return false when Return station name is not a string', () => {
      expect(
        validateJourney({
          ...validCsvRow,
          'Departure station name': 1.0,
        })
      ).toBe(false)
    })
    test('Should return false when Return station name is null', () => {
      expect(
        validateJourney({
          ...validCsvRow,
          'Departure station name': null,
        })
      ).toBe(false)
    })
    test('Should return false when Return station name is undefined', () => {
      expect(
        validateJourney({
          ...validCsvRow,
          'Departure station name': undefined,
        })
      ).toBe(false)
    })
  })
})
