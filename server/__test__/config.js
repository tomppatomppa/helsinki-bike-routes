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
  stations: [
    {
      FID: 1,
      ID: 501,
      Nimi: 'Hanasaari',
      Namn: 'Hanaholmen',
      Name: 'Hanasaari',
      Osoite: 'Hanasaarenranta 1',
      Adress: 'Hanaholmsstranden 1',
      Kaupunki: 'Espoo',
      Operaattor: 'CityBike Finland',
      Kapasiteet: '10',
      x: 24.840319,
      y: 60.16582,
    },
    {
      FID: 2,
      ID: 503,
      Nimi: 'Keilalahti',
      Namn: 'Kägelviken',
      Name: 'Keilalahti',
      Osoite: 'Kägelviksvägen 2',
      Adress: 'Kägelviksvägen 2',
      Kaupunki: 'Espoo',
      Operaattor: 'CityBike Finland',
      Kapasiteet: '28',
      x: 24.827467,
      y: 60.171524,
    },
    {
      FID: 3,
      ID: 505,
      Nimi: 'Westendinasema',
      Namn: 'Westendstationen',
      Name: 'Westendinasema',
      Osoite: 'Westendvägen 1',
      Adress: 'Westendvägen 1',
      Kaupunki: 'Espoo',
      Operaattor: 'CityBike Finland',
      Kapasiteet: '16',
      x: 24.805758,
      y: 60.168266,
    },
    {
      FID: 4,
      ID: 507,
      Nimi: 'Golfpolku',
      Namn: 'Golfstigen',
      Name: 'Golfpolku',
      Osoite: 'Golfstigen 3',
      Adress: 'Golfstigen 3',
      Kaupunki: 'Espoo',
      Operaattor: 'CityBike Finland',
      Kapasiteet: '16',
      x: 24.796136,
      y: 60.168143,
    },
    {
      FID: 5,
      ID: 509,
      Nimi: 'Revontulentie',
      Namn: 'Norrskensvägen',
      Name: 'Revontulentie',
      Osoite: 'Norrskensvägen 10',
      Adress: 'Norrskensvägen 10',
      Kaupunki: 'Espoo',
      Operaattor: 'CityBike Finland',
      Kapasiteet: '30',
      x: 24.802938,
      y: 60.171551,
    },
    {
      FID: 6,
      ID: 511,
      Nimi: 'Sateentie',
      Namn: 'Regnvägen',
      Name: 'Sateentie',
      Osoite: 'Regnvägen 2',
      Adress: 'Regnvägen 2',
      Kaupunki: 'Espoo',
      Operaattor: 'CityBike Finland',
      Kapasiteet: '18',
      x: 24.810688,
      y: 60.173424,
    },
    {
      FID: 7,
      ID: 513,
      Nimi: 'Hakalehto',
      Namn: 'Hagliden',
      Name: 'Hakalehto',
      Osoite: 'Havsvindsvägen 18',
      Adress: 'Havsvindsvägen 18',
      Kaupunki: 'Espoo',
      Operaattor: 'CityBike Finland',
      Kapasiteet: '24',
      x: 24.79139,
      y: 60.173567,
    },
    {
      FID: 8,
      ID: 515,
      Nimi: 'Oravannahkatori',
      Namn: 'Gråskinnstorget',
      Name: 'Oravannahkatori',
      Osoite: 'Gråskinnstorget 1',
      Adress: 'Gråskinnstorget 1',
      Kaupunki: 'Espoo',
      Operaattor: 'CityBike Finland',
      Kapasiteet: '16',
      x: 24.792559,
      y: 60.175769,
    },
    {
      FID: 9,
      ID: 517,
      Nimi: 'Länsituuli',
      Namn: 'Västanvinden',
      Name: 'Länsituuli',
      Osoite: 'Västanvindsgränden 3',
      Adress: 'Västanvindsgränden 3',
      Kaupunki: 'Espoo',
      Operaattor: 'CityBike Finland',
      Kapasiteet: '24',
      x: 24.802049,
      y: 60.175358,
    },
  ],
  journeys: [
    {
      id: 1,
      Departure: '2021-05-31T20:57:25.000Z',
      Return: '2021-05-31T21:05:46.000Z',
      Departure_station_id: 501,
      Departure_station_name: 'Hanasaari',
      Return_station_id: 503,
      Return_station_name: 'Keilalahti',
      Covered_distance_m: 2043,
      Duration_sec: 600,
    },
    {
      id: 2,
      Departure: '2021-05-31T20:56:59.000Z',
      Return: '2021-05-31T21:07:14.000Z',
      Departure_station_id: 503,
      Departure_station_name: 'Keilalahti',
      Return_station_id: 505,
      Return_station_name: 'Westendinasema',
      Covered_distance_m: 1870,
      Duration_sec: 611,
    },
    {
      id: 3,
      Departure: '2021-05-31T20:56:44.000Z',
      Return: '2021-05-31T21:03:26.000Z',
      Departure_station_id: 507,
      Departure_station_name: 'Golfpolku',
      Return_station_id: 509,
      Return_station_name: 'Revontulentie',
      Covered_distance_m: 1025,
      Duration_sec: 800,
    },
    {
      id: 4,
      Departure: '2021-05-31T20:56:23.000Z',
      Return: '2021-05-31T21:29:58.000Z',
      Departure_station_id: 511,
      Departure_station_name: 'Sateentie',
      Return_station_id: 513,
      Return_station_name: 'Hakalehto',
      Covered_distance_m: 4318,
      Duration_sec: 2009,
    },
    {
      id: 5,
      Departure: '2021-05-31T20:56:11.000Z',
      Return: '2021-05-31T21:02:02.000Z',
      Departure_station_id: 515,
      Departure_station_name: 'Oravannahkatori',
      Return_station_id: 517,
      Return_station_name: 'Länsituuli',
      Covered_distance_m: 1400,
      Duration_sec: 1000,
    },
  ],
}
