import { describe, expect, test } from 'vitest'
import { getSwedishCityName } from '../../utils/getSwedishCityName'
import { FINNISH_CITY_NAMES } from '../../types/station'

describe('getSwedishCityName', () => {
  test('Returns null when invalid city name is passed', () => {
    const result = getSwedishCityName('invalidCity' as any)
    expect(result).toBeNull()
  })
  test('Returns correct swedish city names', () => {
    expect(getSwedishCityName('Helsinki' as FINNISH_CITY_NAMES)).toEqual(
      'Helsingfors'
    )
    expect(getSwedishCityName('Espoo' as FINNISH_CITY_NAMES)).toEqual('Esbo')
    expect(getSwedishCityName('Vantaa' as FINNISH_CITY_NAMES)).toEqual('Vanda')
  })
})
