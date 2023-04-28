module.exports = {
  validateCSV: {
    validHeaders: [
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
    ],
  },
  tripValidator: {
    validCsvRow: {
      'Covered distance (m)': '1870',
      'Departure station id': '082',
      'Departure station name': 'Töölöntulli',
      'Duration (sec.)': '611',
      Return: '2021-06-01T00:07:14',
      'Return station id': '113',
      'Return station name': 'Pasilan asema',
      Departure: '2021-05-31T23:56:59',
    },
  },
}
