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

  // test('should return status 200', async () => {
  //   const response = await request(app)
  //     .post('/api/journeys/add-many')
  //     .attach('file', fs.readFileSync(journeysCsvFile), 'journeys.csv')
  //     .set('Content-Type', 'multipart/form-data')

  //   expect(response.status).toBe(200)
  // })
})
