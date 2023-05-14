const supertest = require('supertest')
const request = supertest
const app = require('../../app')
const { connectToDatabase, sequelize } = require('../../utils/database')
const { Station, Journey } = require('../../models')

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

describe('Test /api/stations/:id', () => {
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
      expect(parseInt(body.departures_count)).toBe(1)
    })
    test('returns correct number of journeys returning to the station', async () => {
      const { body } = await request(app).get('/api/stations/501').expect(200)
      expect(body.returns_count).toBeDefined()
      expect(parseInt(body.returns_count)).toBe(0)
    })
  })
  describe('Should only include calculation for a specific month', () => {
    test('Should not include journey in calculation that happened before startdate', async () => {
      const { body } = await request(app)
        .get('/api/stations/501')
        .query({ startDate: '2021-06-01' }) //journey started 2021-05-31T23:57:25
        .expect(200)
      expect(parseInt(body.departures_count)).toBe(0)
    })
    describe('Filtering Departures_count by date', () => {
      test('Should not include journey in calculation that happened after endDate', async () => {
        const { body } = await request(app)
          .get('/api/stations/501')
          .query({ endDate: '2021-05-30' }) //journey started 2021-05-31T23:57:25
          .expect(200)
        expect(parseInt(body.departures_count)).toBe(0)
      })
      test('Should not include journey in calculation', async () => {
        const { body } = await request(app)
          .get('/api/stations/501')
          //journey started 2021-05-31T23:57:25 and ended 2021-06-01T00:05:46
          .query({ startDate: '2021-05-29', endDate: '2021-05-30' })
          .expect(200)
        expect(parseInt(body.departures_count)).toBe(0)
      })
      test('Should include journey in calculation that happened during the interval', async () => {
        const { body } = await request(app)
          .get('/api/stations/501')
          //journey started 2021-05-31T23:57:25 and ended 2021-06-01T00:05:46
          .query({ startDate: '2021-05-01', endDate: '2021-05-31' })
          .expect(200)
        expect(parseInt(body.departures_count)).toBe(1)
      })
    })
    describe('Filtering returns_count by date', () => {
      test('Station 503 has 1 return', async () => {
        const station = await Journey.findAll({
          where: {
            Return_station_id: 503,
          },
        })
        expect(station).toHaveLength(1)
        expect(station[0].Departure.toISOString()).toEqual(
          '2021-05-31T20:57:25.000Z'
        )
        expect(station[0].Return.toISOString()).toEqual(
          '2021-05-31T21:05:46.000Z'
        )
      })
      test('Should have 1 return journey', async () => {
        const { body } = await request(app).get('/api/stations/503').expect(200)
        expect(parseInt(body.returns_count)).toBe(1)
      })
      test('Should have 0 return_count', async () => {
        const { body } = await request(app)
          .get('/api/stations/503')
          //journey started 2021-05-31T23:57:25 and ended 2021-05-31T21:05:46.000Z
          .query({ startDate: '2021-05-01', endDate: '2021-05-30' })
          .expect(200)
        expect(parseInt(body.returns_count)).toBe(0)
      })
      test('Should have 0 return_count', async () => {
        const { body } = await request(app)
          .get('/api/stations/503')
          //journey started 2021-05-31T23:57:25 and ended 2021-05-31T21:05:46.000Z
          .query({ startDate: '2021-04-01', endDate: '2021-04-30' })
          .expect(200)
        expect(parseInt(body.returns_count)).toBe(0)
      })
      test('Should have 1 return_count', async () => {
        const { body } = await request(app)
          .get('/api/stations/503')
          //journey started 2021-05-31T23:57:25 and ended 2021-05-31T21:05:46.000Z
          .query({ startDate: '2021-05-01', endDate: '2021-05-31' })
          .expect(200)
        expect(parseInt(body.returns_count)).toBe(1)
      })
    })
  })
})
