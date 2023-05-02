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
  validateJourney: {
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
    rowWithoutDuration: {
      'Covered distance (m)': '1870',
      'Departure station id': '082',
      'Departure station name': 'Töölöntulli',
      Return: '2021-06-01T00:07:14',
      'Return station id': '113',
      'Return station name': 'Pasilan asema',
      Departure: '2021-05-31T23:56:59',
    },
    rowWithoutDistance: {
      'Departure station id': '082',
      'Departure station name': 'Töölöntulli',
      'Duration (sec.)': '611',
      Return: '2021-06-01T00:07:14',
      'Return station id': '113',
      'Return station name': 'Pasilan asema',
      Departure: '2021-05-31T23:56:59',
    },
  },
  validateStation: {
    validCsvRow: {
      FID: '1',
      ID: '501',
      Nimi: 'Hanasaari',
      Namn: 'Hanaholmen',
      Name: 'Hanasaari',
      Osoite: 'Hanasaarenranta 1',
      Adress: 'Hanaholmsstranden 1',
      Kaupunki: 'Espoo',
      Stad: 'Esbo',
      Operaattor: 'CityBike Finland',
      Kapasiteet: '10',
      x: '24.840319',
      y: '60.16582',
    },
  },
}
