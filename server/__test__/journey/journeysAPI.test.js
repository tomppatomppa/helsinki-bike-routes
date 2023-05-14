require('dotenv').config()
const supertest = require('supertest')
const request = supertest
const app = require('../../app')

const { connectToDatabase, sequelize } = require('../../utils/database')

const { Journey, Station } = require('../../models/index')

const {
  csvData,
  journeyWithInvalidReturnStation,
  journeyWithValidStations,
  oneValidJourneyAndOneInvalidJourney,
} = require('./createData')

const stations = require('../config').stations
const journeys = require('../config').journeys

const station = {
  FID: 1,
  ID: 501,
  Nimi: 'Hanasaari',
  Namn: 'Hanaholmen',
  Name: 'Hanasaari',
  Osoite: 'Hanaholmsstranden 1',
  Adress: 'Hanaholmsstranden 1',
  Kaupunki: 'Espoo',
  Operaattor: 'CityBike Finland',
  Kapasiteet: '10',
  x: 24.840319,
  y: 60.16582,
}
const station2 = {
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
}

beforeAll(async () => {
  await connectToDatabase()
})

afterAll(async () => {
  await sequelize.close()
})

describe('Test /api/journeys', () => {
  describe('Check prerequisites before running tests', () => {
    test('expect journeys to be empty', async () => {
      const allJourneys = await Journey.findAll()
      expect(allJourneys.length).toBe(0)
    })
    test('expect stations to be empty', async () => {
      const allStations = await Station.findAll()
      expect(allStations.length).toBe(0)
    })
  })

  describe('Adding Journeys when no Stations exist in the database', () => {
    test('should return status 400', async () => {
      const csvBuffer = Buffer.from(csvData)
      const response = await request(app)
        .post('/api/journeys/add-many')
        .attach('file', csvBuffer, 'journeys.csv')
        .set('Content-Type', 'multipart/form-data')
      expect(response.status).toBe(400)
    })
    test('No journeys should exist in the database', async () => {
      const allJourneys = await Journey.findAll()
      expect(allJourneys.length).toBe(0)
    })
  })

  describe('When two stations exists in the database', () => {
    test('Add two Stations to the database', async () => {
      await Station.create(station)
      await Station.create(station2)
    })
    test('Expect added stations to exist in the database', async () => {
      const stationExists = await Station.findByPk(station.FID)
      const station2Exists = await Station.findByPk(station2.FID)

      expect(stationExists).toBeDefined()
      expect(station2Exists).toBeDefined()

      expect(stationExists.FID).toEqual(station.FID)
      expect(station2Exists.FID).toEqual(station2.FID)
    })

    test('Should not add Journey when Return_station_id does not exist', async () => {
      const csvBuffer = Buffer.from(journeyWithInvalidReturnStation)
      await request(app)
        .post('/api/journeys/add-many')
        .attach('file', csvBuffer, 'journeys.csv')
        .set('Content-Type', 'multipart/form-data')

      const allJourneys = await Journey.findAll()
      expect(allJourneys.length).toBe(0)
    })
    test('Should add Journey when Departure and Return station ids are valid', async () => {
      const csvBuffer = Buffer.from(journeyWithValidStations)
      await request(app)
        .post('/api/journeys/add-many')
        .attach('file', csvBuffer, 'journeys.csv')
        .set('Content-Type', 'multipart/form-data')

      const allJourneys = await Journey.findAll()
      expect(allJourneys.length).toBe(1)
    })
    test('Should only add one Journey and ignore the invalid Journey', async () => {
      const csvBuffer = Buffer.from(oneValidJourneyAndOneInvalidJourney)
      await request(app)
        .post('/api/journeys/add-many')
        .attach('file', csvBuffer, 'journeys.csv')
        .set('Content-Type', 'multipart/form-data')
        .expect(200)

      const allJourneys = await Journey.findAll()
      expect(allJourneys.length).toBe(2)
    })
  })

  describe('GET /api/journeys with query params', () => {
    describe('Reset and Re-populate database', () => {
      test('Delete Stations and Journeys', async () => {
        await Journey.truncate()
        await Station.truncate({ cascade: true, restartIdentity: true })

        const allJourneys = await Journey.findAll()
        const allStations = await Station.findAll()

        expect(allJourneys.length).toBe(0)
        expect(allStations.length).toBe(0)
      })
      test('Populate database with 9 Stations', async () => {
        await Station.bulkCreate(stations)
        const allStations = await Station.findAll()
        expect(allStations.length).toBe(stations.length)
      })
      test('Populate database with 5 Journeys', async () => {
        await Journey.bulkCreate(journeys)
        const allJourneys = await Journey.findAll()
        expect(allJourneys.length).toBe(journeys.length)
      })
    })
  })

  describe('Test all query params', () => {
    test('5 journeys exists in the database', async () => {
      const response = await request(app).get('/api/journeys')
      expect(response.body.count).toBe(journeys.length)
    })

    describe('Testing query param <limit>', () => {
      test('Expect rows length to be 1 without query params limit', async () => {
        const response = await request(app).get('/api/journeys')
        expect(response.body.rows.length).toBe(1)
      })
      test('Expect rows length to be 2 with query limit=2', async () => {
        const response = await request(app)
          .get('/api/journeys')
          .query({ limit: 2 })
        expect(response.body.rows.length).toBe(2)
      })
      test('Expect rows length to be 5 with query limit=5', async () => {
        const response = await request(app)
          .get('/api/journeys')
          .query({ limit: 5 })
        expect(response.body.rows.length).toBe(5)
      })
    })
    describe('Testing query param <offset>', () => {
      test('returns nextCursor=1 when no offset param is defined', async () => {
        const response = await request(app).get('/api/journeys')
        expect(response.body.nextCursor).toBe(1)
      })
      test('returns nextCursor=2 when offset is 1', async () => {
        const response = await request(app)
          .get('/api/journeys')
          .query({ offset: 1 })
        expect(response.body.nextCursor).toBe(2)
      })
      test('Expect nextCursor to be undefined when no more journeys exist', async () => {
        const response = await request(app)
          .get('/api/journeys')
          .query({ offset: 4 })
        expect(response.body.nextCursor).toBe(undefined)
      })
    })

    describe('Testing default query param <order>', () => {
      test('returns Journeys in ascending order by id, by default', async () => {
        const response = await request(app)
          .get('/api/journeys')
          .query({ limit: 5 })

        expect(response.body.rows[0].id).toEqual(journeys[0].id)
        expect(response.body.rows[2].id).toEqual(journeys[2].id)
        expect(response.body.rows[4].id).toEqual(journeys[4].id)
      })
      test('returns Journeys in descending order by id', async () => {
        const response = await request(app)
          .get('/api/journeys')
          .query({ limit: 5, order: ['id', 'DESC'] })

        expect(response.body.rows[0].id).toEqual(journeys[4].id)
        expect(response.body.rows[2].id).toEqual(journeys[2].id)
        expect(response.body.rows[4].id).toEqual(journeys[0].id)
      })
      test('returns Journeys in descending order by Covered_distance_m', async () => {
        const { body } = await request(app)
          .get('/api/journeys')
          .query({ limit: 5, order: ['Covered_distance_m', 'DESC'] })

        const { rows } = body

        let currentDistance = rows[0].Covered_distance_m

        for (let i = 1; i < rows.length; i++) {
          const { Covered_distance_m } = rows[i]
          expect(Covered_distance_m).toBeLessThanOrEqual(currentDistance)
          currentDistance = Covered_distance_m
        }
      })

      test('returns Journeys in ascending order by Covered_distance_m', async () => {
        const { body } = await request(app)
          .get('/api/journeys')
          .query({ limit: 5, order: ['Covered_distance_m', 'ASC'] })

        const { rows } = body

        let currentDistance = rows[0].Covered_distance_m
        for (let i = 1; i < rows.length; i++) {
          const { Covered_distance_m } = rows[i]
          expect(Covered_distance_m).toBeGreaterThanOrEqual(currentDistance)
          currentDistance = Covered_distance_m
        }
      })
    })

    describe('Test query param search', () => {
      test('Endpoint should not find any journeys with the given starting station', async () => {
        const { body } = await request(app).get('/api/journeys').query({
          limit: 5,
          search: 'doesnotexist',
          search_field: 'Departure_station_name',
        })
        expect(body.rows.length).toBe(0)
      })
      test('Endpoint should find one journey where departure station has "Hana"', async () => {
        const { body } = await request(app).get('/api/journeys').query({
          limit: 5,
          search: 'Hana',
          search_field: 'Departure_station_name',
        })
        expect(body.rows.length).toBe(1)
        expect(body.nextCursor).toBe(undefined)
      })
      test('Endpoint should find three journeys where departure station has "h"', async () => {
        const { body } = await request(app).get('/api/journeys').query({
          limit: 5,
          search: 'h',
          search_field: 'Departure_station_name',
        })
        expect(body.rows.length).toBe(3)
        expect(body.nextCursor).toBe(undefined)
      })
      test('Test pagination with search, nextCursor should be 1', async () => {
        const { body } = await request(app).get('/api/journeys').query({
          limit: 1,
          search: 'h',
          search_field: 'Departure_station_name',
        })
        expect(body.rows.length).toBe(1)
        expect(body.nextCursor).toBe(1)
      })
    })
  })
})
