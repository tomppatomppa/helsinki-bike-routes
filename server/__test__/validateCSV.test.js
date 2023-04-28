const path = require('path')

const { validateCSV } = require('../validators/validateCSV')

const filePath = path.resolve(__dirname, './files/testfile_trips.csv')

describe('Test validation.js', () => {
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
