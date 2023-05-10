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

export function readCsvFileHeaders(file: File): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      const csvText = reader.result as string
      const [headers] = csvText.split('\n')

      if (arraysEqual(headers.split(','), journeyHeaders)) {
        resolve('journeys')
      } else if (arraysEqual(headers.split(','), stationHeaders)) {
        resolve('stations')
      } else {
        resolve(null)
      }
    }

    reader.onerror = () => {
      reject(reader.error)
    }

    reader.readAsText(file)
  })
}
