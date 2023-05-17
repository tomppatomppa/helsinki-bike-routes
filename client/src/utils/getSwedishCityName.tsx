export function getSwedishCityName(nimi: string) {
  if (nimi === 'Helsinki') return 'Helsingfors'
  if (nimi === 'Espoo') return 'Esbo'
  if (nimi === 'Vantaa') return 'Vanda'
  return null
}
