const isFloat = require('../utils/validators/isFloat')

describe('isFloat', () => {
  test('Returns true when number is float', () => {
    expect(isFloat(7778.09)).toBe(true)
  })
  test('Returns true when number is string float', () => {
    expect(isFloat('7778.02')).toBe(true)
  })
  test('Returns false when number is int', () => {
    expect(isFloat(7778)).toBe(false)
  })
  test('Returns false when number is string int', () => {
    expect(isFloat('7778')).toBe(false)
  })
  test('Returns false when null', () => {
    expect(isFloat(null)).toBe(false)
  })
  test('Returns false when undefined', () => {
    expect(isFloat(undefined)).toBe(false)
  })
  test('Returns false when alpha string', () => {
    expect(isFloat('string')).toBe(false)
  })
})
