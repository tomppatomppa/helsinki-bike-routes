const supertest = require('supertest')
const request = supertest
const app = require('../../app')
const { connectToDatabase, sequelize } = require('../../utils/database')
const { Station, Journey } = require('../../models')

const {
  journeysStartingFrom501EndingIn503,
  journeysStartingFrom503EndingIn501,
} = require('../journey/createData')
const {
  csvData,
  stationsWithoutOptionalFields,
  stationsWithInvalidCoordinates,
  stationsWithInvalidNames,
  stationsWithInvalidAddress,
  stationsWithInvalidKapasiteet,
  stationsWithDuplicateFID,
} = require('./createData')

beforeAll(async () => {
  await new Promise((resolve) => setTimeout(resolve, 200))
  await connectToDatabase()
})

afterAll(async () => {
  await sequelize.close()
})

describe('/api/stations/add-many', () => {
  test('Adding stations from csv with invalid coordinates should add 0', async () => {
    const csvBuffer = Buffer.from(stationsWithInvalidCoordinates)
    await request(app)
      .post('/api/stations/add-many')
      .attach('file', csvBuffer, 'stations.csv')
      .set('Content-Type', 'multipart/form-data')
      .expect(200)

    const stations = await Station.findAll()
    expect(stations).toHaveLength(0)
  })
  test('Adding stations from csv with invalid Name/Nimi/Namn should add 0 stations', async () => {
    const csvBuffer = Buffer.from(stationsWithInvalidNames)
    await request(app)
      .post('/api/stations/add-many')
      .attach('file', csvBuffer, 'stations.csv')
      .set('Content-Type', 'multipart/form-data')
      .expect(200)

    const stations = await Station.findAll()
    expect(stations).toHaveLength(0)
  })
  test('Adding stations from csv with invalid Name/Nimi/Namn should add 0 stations', async () => {
    const csvBuffer = Buffer.from(stationsWithInvalidAddress)
    await request(app)
      .post('/api/stations/add-many')
      .attach('file', csvBuffer, 'stations.csv')
      .set('Content-Type', 'multipart/form-data')
      .expect(200)

    const stations = await Station.findAll()
    expect(stations).toHaveLength(0)
  })
  test('Adding stations from csv with invalid Name/Nimi/Namn should add 0 stations', async () => {
    const csvBuffer = Buffer.from(stationsWithInvalidKapasiteet)
    await request(app)
      .post('/api/stations/add-many')
      .attach('file', csvBuffer, 'stations.csv')
      .set('Content-Type', 'multipart/form-data')
      .expect(200)

    const stations = await Station.findAll()
    expect(stations).toHaveLength(0)
  })
  test('Adding 2 stations from csv with duplicate FID should add only the first', async () => {
    const csvBuffer = Buffer.from(stationsWithDuplicateFID)
    await request(app)
      .post('/api/stations/add-many')
      .attach('file', csvBuffer, 'stations.csv')
      .set('Content-Type', 'multipart/form-data')
      .expect(200)

    const stations = await Station.findAll()
    expect(stations).toHaveLength(1)
    expect(stations[0].Name).toBe('Hanasaari')
  })

  test('Should return 200 and 3 stations to exist in the database', async () => {
    const csvBuffer = Buffer.from(stationsWithoutOptionalFields)
    await request(app)
      .post('/api/stations/add-many')
      .attach('file', csvBuffer, 'stations.csv')
      .set('Content-Type', 'multipart/form-data')
      .expect(200)
    const stations = await Station.findAll()
    expect(stations).toHaveLength(3)
  })
  test('Should return 200 and 9 stations to exist in the database', async () => {
    const csvBuffer = Buffer.from(csvData)
    await request(app)
      .post('/api/stations/add-many')
      .attach('file', csvBuffer, 'stations.csv')
      .set('Content-Type', 'multipart/form-data')
      .expect(200)
    const stations = await Station.findAll()
    expect(stations).toHaveLength(9)
  })
})

const journeys = require('../config').journeys

describe('GET /api/station/', () => {
  test('Reset Stations and Journeys', async () => {
    await Station.truncate({ cascade: true, restartIdentity: true })
    await Journey.truncate()

    const allJourneys = await Journey.findAll()
    const allStations = await Station.findAll()

    expect(allJourneys).toHaveLength(0)
    expect(allStations).toHaveLength(0)
  })
  test('Populate database with 9 Stations and 5 journeys', async () => {
    const csvFile = Buffer.from(csvData)
    await request(app)
      .post('/api/stations/add-many')
      .attach('file', csvFile, 'stations.csv')
      .set('Content-Type', 'multipart/form-data')
      .expect(200)
    await Journey.bulkCreate(journeys)
    const allJourneys = await Journey.findAll()
    const allStations = await Station.findAll()

    expect(allJourneys.length).toBe(journeys.length)
    expect(allStations.length).toBe(9)
  })
  describe('Test endpoint without query params', () => {
    test('Should return 1 station and the nextCursor should be 1', async () => {
      const result = await request(app).get('/api/stations')
      expect(result.body.rows).toHaveLength(1)
      expect(result.body.nextCursor).toBe(1)
    })
  })
  describe('Test endpoint with query params', () => {
    describe('Test Query param limit', () => {
      test('Should return 5 stations and the nextCursor should be 5', async () => {
        const result = await request(app)
          .get('/api/stations')
          .query({ limit: 5 })
        expect(result.body.rows).toHaveLength(5)
        expect(result.body.nextCursor).toBe(5)
      })
      test('Should return 9 station and the nextCursor should be undefined', async () => {
        const result = await request(app)
          .get('/api/stations')
          .query({ limit: 9 })
        expect(result.body.rows).toHaveLength(9)
        expect(result.body.nextCursor).toBe(undefined)
      })
    })
    describe('Query param offset', () => {
      test('Should not return the same station when cursor from previous request', async () => {
        const result1 = await request(app)
          .get('/api/stations')
          .query({ offset: 0 })

        const cursor = result1.body.nextCursor
        const result2 = await request(app)
          .get('/api/stations')
          .query({ offset: cursor })

        expect(result1.body.rows).not.toEqual(result2.body.rows)
      })
      test('Should return 1 station and the nextCursor should be undefined', async () => {
        const result = await request(app)
          .get('/api/stations')
          .query({ offset: 8 })
        expect(result.body.rows).toHaveLength(1)
        expect(result.body.nextCursor).toBe(undefined)
      })
    })

    describe('Query param search', () => {
      test('Endpoint should not find any stations with the given finnish Name', async () => {
        const result = await request(app).get('/api/stations').query({
          limit: 5,
          search: 'doesnotexist',
          search_field: 'Nimi',
        })
        expect(result.body.rows).toHaveLength(0)
      })

      test('Search multiple fields at the same time', async () => {
        const result = await request(app).get('/api/stations').query({
          limit: 5,
          search: 'norr',
          search_field: 'Nimi, Namn, Name',
        })
        expect(result.body.rows).toHaveLength(1)
      })
      test('Should not find any Nimi or Name that matches "norr" ', async () => {
        const result = await request(app).get('/api/stations').query({
          limit: 5,
          search: 'norr',
          search_field: 'Nimi, Name',
        })
        expect(result.body.rows).toHaveLength(0)
      })
    })
  })
})

describe('GET /api/stations/:id', () => {
  test('Reset Stations and Journeys', async () => {
    await Station.truncate({ cascade: true, restartIdentity: true })
    await Journey.truncate()

    const allJourneys = await Journey.findAll()
    const allStations = await Station.findAll()

    expect(allJourneys).toHaveLength(0)
    expect(allStations).toHaveLength(0)
  })

  test('Populate database with 9 Stations and 16 journeys', async () => {
    const stations = Buffer.from(csvData)
    await request(app)
      .post('/api/stations/add-many')
      .attach('file', stations, 'stations.csv')
      .set('Content-Type', 'multipart/form-data')
      .expect(200)

    const journeys1 = Buffer.from(journeysStartingFrom501EndingIn503)
    await request(app)
      .post('/api/journeys/add-many')
      .attach('file', journeys1, 'journeys.csv')
      .set('Content-Type', 'multipart/form-data')
      .expect(200)

    const journeys2 = Buffer.from(journeysStartingFrom503EndingIn501)
    await request(app)
      .post('/api/journeys/add-many')
      .attach('file', journeys2, 'journeys.csv')
      .set('Content-Type', 'multipart/form-data')
      .expect(200)

    const journeysStartingFrom501 = await Journey.findAll({
      where: {
        Departure_station_id: 501,
      },
    })
    const journeysStartingFrom503 = await Journey.findAll({
      where: {
        Departure_station_id: 503,
      },
    })
    const allStations = await Station.findAll()
    const allJourneys = await Journey.findAll()
    expect(journeysStartingFrom501).toHaveLength(8)
    expect(journeysStartingFrom503).toHaveLength(8)
    expect(allStations.length).toBe(9)
    expect(allJourneys).toHaveLength(16)
  })
  describe('Test Invalid station search', () => {
    test('returns 404 when station doesnt exist', async () => {
      await request(app).get('/api/stations/9999').expect(404)
    })
    test('returns 400 when station doesnt exist', async () => {
      await request(app).get('/api/stations/invalid').expect(400)
    })
  })
  describe('Test valid station search', () => {
    test('returns 200 when station exists', async () => {
      await request(app).get('/api/stations/501').expect(200)
    })
    test('returns 200 when station exists', async () => {
      await request(app).get('/api/stations/501').expect(200)
    })
    test('returns Name and Adress fields', async () => {
      const { body } = await request(app).get('/api/stations/501').expect(200)

      expect(body.Name).toBeDefined()
      expect(body.Namn).toBeDefined()
      expect(body.Nimi).toBeDefined()

      expect(body.Osoite).toBeDefined()
      expect(body.Adress).toBeDefined()
    })
    test('returns correct number of journeys starting from the stations', async () => {
      const { body } = await request(app).get('/api/stations/501').expect(200)
      expect(body.departures_count).toBeDefined()
      expect(parseInt(body.departures_count)).toBe(8)
    })
    test('returns correct number of journeys returning to the station', async () => {
      const { body } = await request(app).get('/api/stations/501').expect(200)
      expect(body.returns_count).toBeDefined()
      expect(parseInt(body.returns_count)).toBe(8)
    })
  })

  describe('Should only include calculation for a specific month', () => {
    describe('Departures', () => {
      test('Should return 5 stations that started from 501 during 05/2021', async () => {
        const { body } = await request(app)
          .get('/api/stations/501')
          .query({ startDate: '2021-05-01', endDate: '2021-05-31' }) //journey started 2021-05-31T23:57:25
          .expect(200)
        expect(parseInt(body.departures_count)).toBe(5)
      })
      test('Should return 3 stations that started from 501 during 06/2021', async () => {
        const { body } = await request(app)
          .get('/api/stations/501')
          .query({ startDate: '2021-06-01', endDate: '2021-06-30' })
          .expect(200)
        expect(parseInt(body.departures_count)).toBe(3)
      })
      test('Should return 0 stations that started from 501 between 2021-05-02 - 2021-05-03', async () => {
        const { body } = await request(app)
          .get('/api/stations/501')
          .query({ startDate: '2021-05-02', endDate: '2021-05-03' })
          .expect(200)
        expect(parseInt(body.departures_count)).toBe(0)
      })
      test('Should return 0 stations that started from 501 after 07/2021', async () => {
        const { body } = await request(app)
          .get('/api/stations/501')
          .query({ startDate: '2021-07-01', endDate: '2021-07-31' })
          .expect(200)
        expect(parseInt(body.departures_count)).toBe(0)
      })
    })
    describe('Returns', () => {
      test('Should return 5 stations that returned to 501 during 05/2021', async () => {
        const { body } = await request(app)
          .get('/api/stations/501')
          .query({ startDate: '2021-05-01', endDate: '2021-05-31' }) //journey started 2021-05-31T23:57:25
          .expect(200)
        expect(parseInt(body.returns_count)).toBe(5)
      })
      test('Should return 3 stations that returned to 501 during 06/2021', async () => {
        const { body } = await request(app)
          .get('/api/stations/501')
          .query({ startDate: '2021-06-01', endDate: '2021-06-30' })
          .expect(200)
        expect(parseInt(body.returns_count)).toBe(3)
      })
      test('Should return 0 stations that returned to 501 between 2021-05-02 - 2021-05-03', async () => {
        const { body } = await request(app)
          .get('/api/stations/501')
          .query({ startDate: '2021-05-02', endDate: '2021-05-03' })
          .expect(200)
        expect(parseInt(body.returns_count)).toBe(0)
      })
      test('Should return 0 stations that started from 501 after 07/2021', async () => {
        const { body } = await request(app)
          .get('/api/stations/501')
          .query({ startDate: '2021-07-01', endDate: '2021-07-31' })
          .expect(200)
        expect(parseInt(body.departures_count)).toBe(0)
      })
    })

    describe('Average distance for departures starting from the station', () => {
      test('Should return 2401 for departures', async () => {
        const { body } = await request(app).get('/api/stations/501').expect(200)
        expect(parseInt(body.average_distance_departures)).toBe(2401)
      })
      test('Should return 2401 for departures during 05/2021', async () => {
        const { body } = await request(app)
          .get('/api/stations/501')
          .query({ startDate: '2021-05-01', endDate: '2021-05-31' })
          .expect(200)
        expect(parseInt(body.average_distance_departures)).toBe(2043)
      })
      test('Should return 3026 for returns', async () => {
        const { body } = await request(app).get('/api/stations/501').expect(200)
        expect(parseInt(body.average_distance_returns)).toBe(3026)
      })
      test('Should return 3043 for returns during 05/2021', async () => {
        const { body } = await request(app)
          .get('/api/stations/501')
          .query({ startDate: '2021-05-01', endDate: '2021-05-31' })
          .expect(200)
        expect(parseInt(body.average_distance_returns)).toBe(3043)
      })
    })

    describe('Top 5 most common return stations', () => {
      test('Should return only Keilalahti Count: 8', async () => {
        const { body } = await request(app).get('/api/stations/501').expect(200)
        expect(body.most_common_return_stations[0]).toEqual(
          'Keilalahti Count: 8'
        )
      })
      test('Should return only Keilalahti Count: 3', async () => {
        const { body } = await request(app)
          .get('/api/stations/501')
          .query({ startDate: '2021-06-01', endDate: '2021-06-30' })
          .expect(200)
        expect(body.most_common_return_stations[0]).toEqual(
          'Keilalahti Count: 3'
        )
      })
      test('Should return only Hanasaari Count: 8', async () => {
        const { body } = await request(app).get('/api/stations/503').expect(200)
        expect(body.most_common_return_stations[0]).toEqual(
          'Hanasaari Count: 8'
        )
      })
      test('Should return only Hanasaari Count: 3', async () => {
        const { body } = await request(app)
          .get('/api/stations/503')
          .query({ startDate: '2021-06-01', endDate: '2021-06-30' })
          .expect(200)
        expect(body.most_common_return_stations[0]).toEqual(
          'Hanasaari Count: 3'
        )
      })
    })
    describe('Top 5 most common departure station for for journeys ending at the station', () => {
      test('Should return only Keilalahti Count: 8', async () => {
        const { body } = await request(app).get('/api/stations/501').expect(200)
        expect(body.most_common_departure_stations[0]).toEqual(
          'Keilalahti Count: 8'
        )
      })
      test('Should return only Keilalahti Count: 3', async () => {
        const { body } = await request(app)
          .get('/api/stations/501')
          .query({ startDate: '2021-06-01', endDate: '2021-06-30' })
          .expect(200)
        expect(body.most_common_departure_stations[0]).toEqual(
          'Keilalahti Count: 3'
        )
      })
      test('Should return only Hanasaari Count: 8', async () => {
        const { body } = await request(app).get('/api/stations/503').expect(200)
        expect(body.most_common_departure_stations[0]).toEqual(
          'Hanasaari Count: 8'
        )
      })
      test('Should return only Hanasaari Count: 3', async () => {
        const { body } = await request(app)
          .get('/api/stations/503')
          .query({ startDate: '2021-06-01', endDate: '2021-06-30' })
          .expect(200)
        expect(body.most_common_departure_stations[0]).toEqual(
          'Hanasaari Count: 3'
        )
      })
    })
  })
})

describe('GET /api/stations/names', () => {
  test('Stations should have only ID and Name field', async () => {
    const { body } = await request(app).get('/api/stations/names').expect(200)

    body.forEach((station) => {
      const keys = Object.keys(station)
      expect(keys.length).toBe(2)
      expect(keys.includes('Name')).toBe(true)
      expect(keys.includes('ID')).toBe(true)
    })
  })
})

describe('DELETE /api/station/:id', () => {
  test('Should return 404 when station doesnt exist', async () => {
    await request(app).delete('/api/stations/901').expect(404)
  })
  test('Should return 200 when succesfully deleted station', async () => {
    await request(app).delete('/api/stations/501').expect(200)
    const station = await Station.findOne({
      where: {
        ID: 501,
      },
    })
    expect(station).toBe(null)
  })
})
