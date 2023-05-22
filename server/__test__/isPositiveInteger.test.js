const isPositiveInteger = require('../utils/validators/isPositiveInteger')

describe('isPositiveIteger.js', () => {
  test('Should return false for -1', () => {
    expect(isPositiveInteger(-1)).toBe(false)
  })
  test('Should return false for "-1" ', () => {
    expect(isPositiveInteger('-1')).toBe(false)
  })
  test('Should return false for float', () => {
    expect(isPositiveInteger(1.1)).toBe(false)
  })
  test('Should return false for string', () => {
    expect(isPositiveInteger('string')).toBe(false)
  })
  test('Should return true for 1', () => {
    expect(isPositiveInteger(1)).toBe(true)
  })
  test('Should return true for "1" ', () => {
    expect(isPositiveInteger('1')).toBe(true)
  })
  test('Should return true for 0', () => {
    expect(isPositiveInteger(0)).toBe(true)
  })
  test('Should return true for "0" ', () => {
    expect(isPositiveInteger('0')).toBe(true)
  })
})
