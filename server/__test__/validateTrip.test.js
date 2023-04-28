const tripValidator = require('../validators/tripValidator')

const config = require('./config')
const validCsvRow = config.tripValidator.validCsvRow
const rowWithoutDuration = config.tripValidator.rowWithoutDuration
const rowWithoutDistance = config.tripValidator.rowWithoutDistance

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
    test('tripValidator returns false for trip duration is undefined', () => {
      expect(
        tripValidator({ ...validCsvRow, 'Duration (sec.)': undefined })
      ).toBe(false)
    })
    test('tripValidator returns false for trip duration is NaN', () => {
      expect(
        tripValidator({ ...validCsvRow, 'Duration (sec.)': 'notanumber' })
      ).toBe(false)
    })
    test('tripValidator returns false for trip duration is null', () => {
      expect(tripValidator({ ...validCsvRow, 'Duration (sec.)': null })).toBe(
        false
      )
    })
    test('tripValidator returns false duration doesnt exists', () => {
      expect(tripValidator(rowWithoutDuration)).toBe(false)
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
    test('tripValidator returns false when distance is undefined', () => {
      expect(
        tripValidator({ ...validCsvRow, 'Covered distance (m)': undefined })
      ).toBe(false)
    })
    test('tripValidator returns false when distance is NaN', () => {
      expect(
        tripValidator({ ...validCsvRow, 'Covered distance (m)': 'notanumber' })
      ).toBe(false)
    })
    test('tripValidator returns false when distance is empty string', () => {
      expect(
        tripValidator({ ...validCsvRow, 'Covered distance (m)': 'notanumber' })
      ).toBe(false)
    })
    test('tripValidator returns false when distance is null', () => {
      expect(
        tripValidator({ ...validCsvRow, 'Covered distance (m)': null })
      ).toBe(false)
    })
    test('tripValidator returns false when distance doesnt exist', () => {
      expect(tripValidator(rowWithoutDistance)).toBe(false)
    })
  })

  describe('Test dates', () => {
    test('should return false with Departure as an invalid date', () => {
      expect(
        tripValidator({ ...validCsvRow, Departure: '2021-13-31T23:52:03' })
      ).toBe(false)
    })
    test('should return false with Return as an invalid date', () => {
      expect(
        tripValidator({ ...validCsvRow, Return: '203-13-31T23:52:03' })
      ).toBe(false)
    })
    test('should return false if departure later than arrival', () => {
      expect(
        tripValidator({
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
        tripValidator({
          ...validCsvRow,
          'Departure station id': 0,
        })
      ).toBe(false)
    })
    test('Id should return false if a negative integer', () => {
      expect(
        tripValidator({
          ...validCsvRow,
          'Departure station id': -1,
        })
      ).toBe(false)
    })
    test('Id should return true with a positive integer', () => {
      expect(
        tripValidator({
          ...validCsvRow,
          'Departure station id': 1,
        })
      ).toBe(true)
    })
  })
})
