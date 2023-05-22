const isNonEmptyString = require('../utils/validators/isNonEmptyString')

describe('isNonEmptyString.js', () => {
  test('Should return false for integer', () => {
    expect(isNonEmptyString(0)).toBe(false)
  })
  test('Should return false for float', () => {
    expect(isNonEmptyString(1.2)).toBe(false)
  })
  test('Should return false for undefined', () => {
    expect(isNonEmptyString(undefined)).toBe(false)
  })
  test('Should return false for null', () => {
    expect(isNonEmptyString(null)).toBe(false)
  })
  test('Should return false for empty string', () => {
    expect(isNonEmptyString('')).toBe(false)
  })
  test('Should return false for a integer as string', () => {
    expect(isNonEmptyString('13123')).toBe(false)
  })
  test('Should return false for a float as string', () => {
    expect(isNonEmptyString('1.2')).toBe(false)
  })
  test('Should return true for string', () => {
    expect(isNonEmptyString('validString')).toBe(true)
  })
})
