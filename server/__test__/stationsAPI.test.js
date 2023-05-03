const fs = require('fs')
const path = require('path')
const supertest = require('supertest')
const request = supertest
const app = require('../app')

const { connectToDatabase, sequelize } = require('../utils/database')
const { Station } = require('../models/index')

const stationsCsvFile = path.join(__dirname, './files/testfile_stations.csv')

beforeAll(async () => {
  await connectToDatabase()
})

afterAll(async () => {
  await sequelize.close()
})

describe('Test api/stations endpoint', () => {
  describe('Check prerequisites before running tests', () => {
    test('expect testfile to exist', () => {
      expect(stationsCsvFile).toBeDefined()
    })
    test('expect stations to be empty before tests', async () => {
      const result = await request(app).get('/api/stations/')
      expect(result.body.length).toBe(0)
    })
  })
  test('should return correct number of stations', async () => {
    const response = await request(app)
      .post('/api/stations/add-many')
      .attach('file', fs.readFileSync(stationsCsvFile), 'stations.csv')
      .set('Content-Type', 'multipart/form-data')

    expect(response.body.length).toBe(9)
  })
})
