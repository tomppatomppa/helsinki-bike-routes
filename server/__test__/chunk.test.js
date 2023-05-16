const { chunk } = require('../utils/helpers')

describe('chunk.js', () => {
  test('Should throw error when  size is < 1', () => {
    expect(() => chunk([1, 2, 3, 4], 0)).toThrow('Size must be positive')
  })
  test('Should return array with 4 subarrays', () => {
    expect(chunk([1, 2, 3, 4], 1)).toHaveLength(4)
  })
  test('Subarrays should have length 1', () => {
    const array = chunk([1, 2, 3, 4], 1)
    array.forEach((element) => {
      expect(element).toHaveLength(1)
    })
  })
  test('Last element should have length 1', () => {
    const array = chunk([1, 2, 3, 4, 5, 6, 7], 2)
    expect(array[array.length - 1]).toHaveLength(1)
  })
  test('Last element should have length 1', () => {
    const array = chunk([1, 2, 3, 4, 5, 6, 7], 2)
    expect(array[array.length - 1]).toHaveLength(1)
  })
  test('Should return 1 subarray when size exceeds number of items', () => {
    const array = chunk([1, 2, 3, 4, 5, 6, 7], 200)
    expect(array).toHaveLength(1)
  })
})
