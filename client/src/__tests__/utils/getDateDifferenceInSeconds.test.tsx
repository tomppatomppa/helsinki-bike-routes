import { describe, expect, test } from 'vitest'
import { getDateDifferenceInSeconds } from '../../utils/getDateDifferenceInSeconds'

describe('getDateDifferenceInMinutes', () => {
  test('Return correct difference between dates', () => {
    const date = new Date('2023-05-22T11:30:00')
    const date2 = new Date('2023-05-22T11:40:00')
    expect(getDateDifferenceInSeconds(date, date2)).toEqual(600)
  })
})
