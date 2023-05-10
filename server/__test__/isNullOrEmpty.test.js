const isNullOrEmpty = require('../utils/validators/isNullOrEmpty')

describe('IsNullOrEmpty.js', () => {
  test('Returns false for boolean', () => {
    expect(isNullOrEmpty(true)).toEqual(false)
  })
  test('Returns false for undefined', () => {
    expect(isNullOrEmpty(undefined)).toEqual(false)
  })
  test('Returns false for int', () => {
    expect(isNullOrEmpty(0)).toEqual(false)
  })
  test('Returns false for float', () => {
    expect(isNullOrEmpty(1.2)).toEqual(false)
  })
  test('Returns false for non empty string', () => {
    expect(isNullOrEmpty('s')).toEqual(false)
  })
  test('Returns false for non empty string number', () => {
    expect(isNullOrEmpty('2')).toEqual(false)
  })
  test('Returns false for non empty string float', () => {
    expect(isNullOrEmpty('2.2')).toEqual(false)
  })
  test('Returns false for empty array', () => {
    expect(isNullOrEmpty([])).toEqual(false)
  })
  test('Returns false for empty object', () => {
    expect(isNullOrEmpty({})).toEqual(false)
  })
  // test('Returns true for space', () => {
  //   expect(isNullOrEmpty(' ')).toEqual(true)
  // })
  test('Returns true for empty string', () => {
    expect(isNullOrEmpty('')).toEqual(true)
  })
  test('Returns true for null', () => {
    expect(isNullOrEmpty(null)).toEqual(true)
  })
})
