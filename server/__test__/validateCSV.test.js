const path = require('path')

const { validateCSV } = require('../validators/validateCSV')
const tripValidator = require('../validators/tripValidator')

const filePath = path.resolve(__dirname, './files/testfile_trips.csv')

describe('Test validation.js', () => {
  describe('Without a validation function ', () => {
    test('check that testfile exists', () => {
      expect(filePath).toBeDefined()
    })
    test('validateCSV returns an array', async () => {
      const result = await validateCSV(filePath)
      expect(Array.isArray(result)).toBe(true)
    })
    test('validateCSV correct length', async () => {
      const result = await validateCSV(filePath)
      expect(result.length).toEqual(9)
    })
  })
  describe('With tripValidator  function', () => {
    test('should filter out 4 rows that have duration < 600', async () => {
      const result = await validateCSV(filePath, tripValidator)
      expect(result.length).toEqual(5)
    })
  })
})
