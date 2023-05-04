const path = require('path')

const parseCSV = require('../utils/parsers/parseCSV')
const validateJourney = require('../utils/validators/validateJourney')
const validateStation = require('../utils/validators/validateStation')

const journeys = path.resolve(__dirname, './files/testfile_journeys.csv')
const stations = path.resolve(__dirname, './files/testfile_stations.csv')

describe('Test parseCSV.js', () => {
  describe('Without a validation function ', () => {
    test('check that testfile exists', () => {
      expect(journeys).toBeDefined()
    })
    test('parseCSV returns an array', async () => {
      const result = await parseCSV(journeys)
      expect(Array.isArray(result)).toBe(true)
    })
    test('parseCSV correct length', async () => {
      const result = await parseCSV(journeys)
      expect(result.length).toEqual(9)
    })
  })

  describe('With validateJourney function', () => {
    test('should only return 5 objects', async () => {
      const result = await parseCSV(journeys, validateJourney)
      expect(result.length).toEqual(5)
    })
    test('remaining objects should have duration > 600', async () => {
      const result = await parseCSV(journeys, validateJourney)
      result.forEach((item) =>
        expect(Number(item['Duration_sec'])).toBeGreaterThanOrEqual(600)
      )
    })
    test('remaining objects should have distance > 10', async () => {
      const result = await parseCSV(journeys, validateJourney)
      result.forEach((item) =>
        expect(Number(item['Covered_distance_m'])).toBeGreaterThanOrEqual(10)
      )
    })
  })
  describe('With validateStation function', () => {
    test('should return 9 objects', async () => {
      const result = await parseCSV(stations, validateStation)
      expect(result.length).toEqual(9)
    })
  })
})
