const fs = require('fs')
const path = require('path')
const supertest = require('supertest')
const request = supertest
const app = require('../app')

const { connectToDatabase, sequelize } = require('../utils/database')

const journeys = require('./config').journeys
const { Journey, Station } = require('../models/index')
const stationsCsvFile = path.join(__dirname, './files/testfile_stations.csv')
const invalidStationCsvFile = path.join(
  __dirname,
  './files/testfile_invalid_stations.csv'
)
const textfile = path.join(__dirname, './files/textfile.txt')

beforeAll(async () => {
  await connectToDatabase()
})

afterAll(async () => {
  await sequelize.close()
})

describe('Test api/stations endpoint', () => {
  describe('POST /api/stations/add-many', () => {
    describe('Check prerequisites before running tests', () => {
      test('expect testfile to exist', () => {
        expect(stationsCsvFile).toBeDefined()
        expect(invalidStationCsvFile).toBeDefined()
      })
      test('expect stations to be empty before tests', async () => {
        const result = await Station.findAll()
        expect(result.length).toBe(0)
      })
    })
    describe('Test sending invalid files to the endpoint', () => {
      test('Should return 400 when nothing is sent', async () => {
        await request(app).post('/api/stations/add-many').expect(400)
      })
      test('Should return 400 when wrong filetype is sent', async () => {
        await request(app)
          .post('/api/stations/add-many')
          .attach('file', fs.readFileSync(textfile), 'textfile.txt')
          .set('Content-Type', 'multipart/form-data')
          .expect(400)
      })
      test('Should return 400 when file KEY is not "file"', async () => {
        await request(app)
          .post('/api/stations/add-many')
          .attach('errorKey', fs.readFileSync(stationsCsvFile), 'stations.csv')
          .set('Content-Type', 'multipart/form-data')
          .expect(400)
      })
    })
    describe('Adding station to the database', () => {
      test('Should return 200 when adding valid stations', async () => {
        await request(app)
          .post('/api/stations/add-many')
          .attach('file', fs.readFileSync(stationsCsvFile), 'stations.csv')
          .set('Content-Type', 'multipart/form-data')
          .expect(200)
      })
      test('Should return array of 9 stations', async () => {
        const result = await Station.findAll()
        expect(result.length).toEqual(9)
      })
    })
    describe('Adding an existing station', () => {
      test('Should not throw error when duplicate FID', async () => {
        await request(app)
          .post('/api/stations/add-many')
          .attach(
            'file',
            fs.readFileSync(invalidStationCsvFile),
            'stations.csv'
          )
          .set('Content-Type', 'multipart/form-data')
          .expect(200)
      })
    })
  })

  describe('GET /api/station/', () => {
    test('Populate database with 5 journeys', async () => {
      await Journey.bulkCreate(journeys)
      const allJourneys = await Journey.findAll()
      expect(allJourneys.length).toBe(5)
    })
    describe('Test endpoint without query params', () => {
      test('Should return 1 station and the nextCursor should be 1', async () => {
        const result = await request(app).get('/api/stations')
        expect(result.body.allStations.rows).toHaveLength(1)
        expect(result.body.nextCursor).toBe(1)
      })
    })
    describe('Test endpoint with query params', () => {
      describe('Query param limit', () => {
        test('Should return 5 station and the nextCursor should be 5', async () => {
          const result = await request(app)
            .get('/api/stations')
            .query({ limit: 5 })
          expect(result.body.allStations.rows).toHaveLength(5)
          expect(result.body.nextCursor).toBe(5)
        })
        test('Should return 9 station and the nextCursor should be undefined', async () => {
          const result = await request(app)
            .get('/api/stations')
            .query({ limit: 9 })
          expect(result.body.allStations.rows).toHaveLength(9)
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

          expect(result1.body.allStations.rows).not.toEqual(
            result2.body.allStations.rows
          )
        })
        test('Should return 1 station and the nextCursor should be undefined', async () => {
          const result = await request(app)
            .get('/api/stations')
            .query({ offset: 8 })
          expect(result.body.allStations.rows).toHaveLength(1)
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
          expect(result.body.allStations.rows).toHaveLength(0)
        })
        test('Search multiple fields at the same time', async () => {
          const result = await request(app).get('/api/stations').query({
            limit: 5,
            search: 'norr',
            search_field: 'Nimi, Namn, Name',
          })
          expect(result.body.allStations.rows).toHaveLength(1)
        })
        test('Search multiple fields at the same time', async () => {
          const result = await request(app).get('/api/stations').query({
            limit: 5,
            search: 'norr',
            search_field: 'Nimi, Namn, Name',
          })
          expect(result.body.allStations.rows).toHaveLength(1)
        })
        test('Should not find any Nimi or Name that matches "norr" ', async () => {
          const result = await request(app).get('/api/stations').query({
            limit: 5,
            search: 'norr',
            search_field: 'Nimi, Name',
          })
          expect(result.body.allStations.rows).toHaveLength(0)
        })
      })
    })
  })
  describe('Test /api/stations/:id', () => {
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
        const result = await request(app).get('/api/stations/501').expect(200)
      })
    })
  })
})
