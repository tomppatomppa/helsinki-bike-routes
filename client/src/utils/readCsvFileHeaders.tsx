import { arraysEqual } from './arraysAreEqual'

const journey = [
  'Departure',
  'Return',
  'Departure station id',
  'Departure station name',
  'Return station id',
  'Return station name',
  'Covered distance (m)',
  'Duration (sec.)\r',
]

export function readCsvFileHeaders(event: React.ChangeEvent<HTMLInputElement>) {
  const file = event.target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.readAsText(file)
  reader.onload = () => {
    const csvText = reader.result as string
    const [headers] = csvText.split('\n')

    console.log(arraysEqual(headers.split(','), journey))
  }
}
