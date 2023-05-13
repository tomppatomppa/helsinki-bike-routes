import { describe, expect, test } from 'vitest'

import { arraysEqual } from '../utils/arraysAreEqual'

describe('arraysAreEqual', () => {
  test('Should return false when order is not the same', () => {
    expect(arraysEqual(['1', '2', '3'], ['3', '2', '1'])).toBe(false)
  })
  test('Should return false when length is not same', () => {
    expect(arraysEqual(['1', '3'], ['3', '2', '1'])).toBe(false)
  })
  test('Should return true', () => {
    expect(arraysEqual(['1', '2'], ['1', '2'])).toBe(true)
  })
})
