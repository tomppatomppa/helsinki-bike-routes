const path = require('path')

const parseCSV = require('../validators/parseCSV')
const validateJourney = require('../validators/validateJourney')

const filePath = path.resolve(__dirname, './files/testfile_trips.csv')

describe('Test validation.js', () => {
  describe('Without a validation function ', () => {
    test('check that testfile exists', () => {
      expect(filePath).toBeDefined()
    })
    test('parseCSV returns an array', async () => {
      const result = await parseCSV(filePath)
      expect(Array.isArray(result)).toBe(true)
    })
    test('parseCSV correct length', async () => {
      const result = await parseCSV(filePath)
      expect(result.length).toEqual(9)
    })
  })
  describe('With validateJourney  function', () => {
    test('should only return 5 objects', async () => {
      const result = await parseCSV(filePath, validateJourney)
      expect(result.length).toEqual(5)
    })
    test('remaining objects should have duration > 600', async () => {
      const result = await parseCSV(filePath, validateJourney)
      result.forEach((item) =>
        expect(Number(item['Duration (sec.)'])).toBeGreaterThanOrEqual(600)
      )
    })
    test('remaining objects should have distance > 10', async () => {
      const result = await parseCSV(filePath, validateJourney)
      result.forEach((item) =>
        expect(Number(item['Covered distance (m)'])).toBeGreaterThanOrEqual(10)
      )
    })
  })
})
