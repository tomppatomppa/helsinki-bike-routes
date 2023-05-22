import { FINNISH_CITY_NAMES, SWEDISH_CITY_NAMES } from '../types/station'

export function getSwedishCityName(
  nimi: FINNISH_CITY_NAMES
): SWEDISH_CITY_NAMES | null {
  if (nimi === FINNISH_CITY_NAMES.helsinki) return SWEDISH_CITY_NAMES.helsinki
  if (nimi === FINNISH_CITY_NAMES.espoo) return SWEDISH_CITY_NAMES.espoo
  if (nimi === FINNISH_CITY_NAMES.vantaa) return SWEDISH_CITY_NAMES.vantaa
  return null
}
