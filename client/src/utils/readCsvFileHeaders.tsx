import { arraysEqual } from './arraysAreEqual'

const journeyHeaders = [
  'Departure',
  'Return',
  'Departure station id',
  'Departure station name',
  'Return station id',
  'Return station name',
  'Covered distance (m)',
  'Duration (sec.)\r',
]
const stationHeaders = [
  'FID',
  'ID',
  'Nimi',
  'Namn',
  'Name',
  'Osoite',
  'Adress',
  'Kaupunki',
  'Stad',
  'Operaattor',
  'Kapasiteet',
  'x',
  'y',
]

export function readCsvFileHeaders(
  event: React.ChangeEvent<HTMLInputElement>
): string {
  const file = event.target.files?.[0]
  if (!file) return 'invalid'

  const reader = new FileReader()
  reader.readAsText(file)

  reader.onload = () => {
    const csvText = reader.result as string
    const [headers] = csvText.split('\n')

    if (arraysEqual(headers.split(','), journeyHeaders)) return 'journeys'
    if (arraysEqual(headers.split(','), stationHeaders)) return 'stations'
  }
  return 'invalid'
}
