/* eslint-disable no-undef */
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const supertest = require('supertest')
const request = supertest
const app = require('../app')
const { connectToDatabase, sequelize } = require('../utils/database')

const journeysCsvFile = path.join(__dirname, './files/testfile_journeys.csv')
const journeyWithInvalidReturnStation = path.join(
  __dirname,
  './files/testfile_withInvalidReturnStation.csv'
)
const journeyWithValidStations = path.join(
  __dirname,
  './files/testfile_withValidStations.csv'
)
const journeyWithOneValidOneInvalid = path.join(
  __dirname,
  './files/testfile_OneValidOneInvalidJourney.csv'
)

const station = {
  FID: 1,
  ID: 501,
  Nimi: 'Hanasaari',
  Namn: 'Hanaholmen',
  Name: 'Hanasaari',
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
  Adress: 'Kägelviksvägen 2',
  Kaupunki: 'Espoo',
  Operaattor: 'CityBike Finland',
  Kapasiteet: '28',
  x: 24.827467,
  y: 60.171524,
}

const { Journey, Station } = require('../models/index')
beforeAll(async () => {
  await connectToDatabase()
})

afterAll(async () => {
  await sequelize.close()
})

describe('test api', () => {
  describe('Check prerequisites before running tests', () => {
    test('expect testfile to exist', () => {
      expect(journeysCsvFile).toBeDefined()
    })
    test('expect journeys to be empty', async () => {
      const allJourneys = await Journey.findAll()
      expect(allJourneys.length).toBe(0)
    })
    test('expect stations to be empty', async () => {
      const allStations = await Station.findAll()
      expect(allStations.length).toBe(0)
    })
  })

  describe('Adding journeys when there are no stations', () => {
    test('should return status 400', async () => {
      const response = await request(app)
        .post('/api/journeys/add-many')
        .attach('file', fs.readFileSync(journeysCsvFile), 'journeys.csv')
        .set('Content-Type', 'multipart/form-data')
      expect(response.status).toBe(400)
    })
    test('Added journeys should not exists in the database', async () => {
      const response = await request(app).get('/api/journeys/')
      expect(response.body.length).toBe(0)
    })
  })

  describe('Test when a station exists', () => {
    test('Add two Stations to the database', async () => {
      await Station.create(station)
      await Station.create(station2)
    })
    test('Expect stations to exist in the database', async () => {
      const stationExists = await Station.findByPk(station.FID)
      const station2Exists = await Station.findByPk(station2.FID)

      expect(stationExists).toBeDefined()
      expect(station2Exists).toBeDefined()

      expect(stationExists.FID).toEqual(station.FID)
      expect(station2Exists.FID).toEqual(station2.FID)
    })

    test('Should not add journey with invalid return station id', async () => {
      await request(app)
        .post('/api/journeys/add-many')
        .attach(
          'file',
          fs.readFileSync(journeyWithInvalidReturnStation),
          'journeys.csv'
        )
        .set('Content-Type', 'multipart/form-data')

      const allJourneys = await Journey.findAll()
      expect(allJourneys.length).toBe(0)
    })
    test('Should add journey with both valid station ids', async () => {
      await request(app)
        .post('/api/journeys/add-many')
        .attach(
          'file',
          fs.readFileSync(journeyWithValidStations),
          'journeys.csv'
        )
        .set('Content-Type', 'multipart/form-data')

      const allJourneys = await Journey.findAll()
      expect(allJourneys.length).toBe(1)
    })
    test('Should only add one journey and ignore invalid journey', async () => {
      await request(app)
        .post('/api/journeys/add-many')
        .attach(
          'file',
          fs.readFileSync(journeyWithOneValidOneInvalid),
          'journeys.csv'
        )
        .set('Content-Type', 'multipart/form-data')
        .expect(200)

      const allJourneys = await Journey.findAll()
      expect(allJourneys.length).toBe(2)
    })
  })
})
