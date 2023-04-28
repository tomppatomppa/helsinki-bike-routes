const path = require('path')
const { validateCSV } = require('../middleware/validateCSV')
const filePath = path.resolve(
  __dirname,
  './files/Helsingin_ja_Espoon_kaupunkipy.csv'
)

describe('Test validation.js', () => {
  test('check that testfile exists', () => {
    expect(filePath).toBeDefined()
  })
  test('check that testfile exists', () => {
    const result = validateCSV(filePath)
    expect(result).toBeDefined()
  })
})
