/* eslint-disable no-undef */
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const supertest = require('supertest')
const request = supertest
const app = require('../app')

const journeysCsvFile = path.join(__dirname, './files/testfile_journeys.csv')

describe('test api', () => {
  test('expect testfile to exist', () => {
    expect(journeysCsvFile).toBeDefined()
  })
  test('should return status 200', async () => {
    const response = await request(app)
      .post('/api/journeys/add-many')
      .attach('file', fs.readFileSync(journeysCsvFile), 'journeys.csv')
      .set('Content-Type', 'multipart/form-data')

    expect(response.status).toBe(200)
  })
  test('should return correct number of journeys', async () => {
    const response = await request(app)
      .post('/api/journeys/add-many')
      .attach('file', fs.readFileSync(journeysCsvFile), 'journeys.csv')
      .set('Content-Type', 'multipart/form-data')

    expect(response.body.length).toBe(5)
  })
})
