const isNullOrWhitespace = require('../utils/validators/isNullOrWhitespace')

describe('isNullOrWhitespace', () => {
  test('Returns true for empty whitespace', () => {
    expect(isNullOrWhitespace(' ')).toBe(true)
  })
  test('Returns true for empty string', () => {
    expect(isNullOrWhitespace('')).toBe(true)
  })
  test('Returns true for null ', () => {
    expect(isNullOrWhitespace('')).toBe(true)
  })
  test('Returns true for undefined ', () => {
    expect(isNullOrWhitespace('')).toBe(true)
  })
  test('Returns true for string ', () => {
    expect(isNullOrWhitespace('string')).toBe(false)
  })
  test('Returns false for boolean ', () => {
    expect(isNullOrWhitespace(true)).toBe(false)
  })
  test('Returns false for int', () => {
    expect(isNullOrWhitespace(1)).toBe(false)
  })
  test('Returns false for float ', () => {
    expect(isNullOrWhitespace(1.2)).toBe(false)
  })
})
