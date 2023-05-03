/* eslint-disable no-undef */
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const supertest = require('supertest')
const request = supertest
const app = require('../app')
const { connectToDatabase, sequelize } = require('../utils/database')
const journeysCsvFile = path.join(__dirname, './files/testfile_journeys.csv')

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
    test('expect journeys to be empty to exist', () => {
      expect(journeysCsvFile).toBeDefined()
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
})
