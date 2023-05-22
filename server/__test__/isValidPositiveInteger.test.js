const isValidPositiveInteger = require('../utils/validators/isValidPositiveInteger')

describe('isValidPositiveInteger.js', () => {
  test('Should return false for 0', () => {
    expect(isValidPositiveInteger(0)).toBe(false)
  })
  test('Should return false for "0"', () => {
    expect(isValidPositiveInteger('0')).toBe(false)
  })
  test('Should return false for -1', () => {
    expect(isValidPositiveInteger(-1)).toBe(false)
  })
  test('Should return false for "-1"', () => {
    expect(isValidPositiveInteger('-1')).toBe(false)
  })
  test('Should return false for float', () => {
    expect(isValidPositiveInteger(1.1)).toBe(false)
  })
  test('Should return false for float string', () => {
    expect(isValidPositiveInteger('1.1')).toBe(false)
  })
  test('Should return false for 0.0', () => {
    expect(isValidPositiveInteger(0.0)).toBe(false)
  })
  test('Should return false for 0.0 string', () => {
    expect(isValidPositiveInteger('0.0')).toBe(false)
  })
  test('Should return false for string', () => {
    expect(isValidPositiveInteger('string')).toBe(false)
  })
  test('Should return false for undefined', () => {
    expect(isValidPositiveInteger(undefined)).toBe(false)
  })
  test('Should return false for null', () => {
    expect(isValidPositiveInteger(null)).toBe(false)
  })
  test('Should return false for empty string', () => {
    expect(isValidPositiveInteger('')).toBe(false)
  })

  //Valid input
  test('Should return true for int with whitespace', () => {
    expect(isValidPositiveInteger(' 123')).toBe(true)
  })
  test('Should return true for valid int', () => {
    expect(isValidPositiveInteger(1)).toBe(true)
  })
  test('Should return true for valid int as string', () => {
    expect(isValidPositiveInteger('1')).toBe(true)
  })
})
