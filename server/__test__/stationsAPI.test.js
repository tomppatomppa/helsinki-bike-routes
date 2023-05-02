const fs = require('fs')
const path = require('path')
const supertest = require('supertest')
const request = supertest
const app = require('../app')

const stationsCsvFile = path.join(__dirname, './files/testfile_stations.csv')

describe('test api', () => {
  test('expect testfile to exist', () => {
    expect(stationsCsvFile).toBeDefined()
  })
  test('should return status 200', async () => {
    const response = await request(app)
      .post('/api/stations/add-many')
      .attach('file', fs.readFileSync(stationsCsvFile), 'stations.csv')
      .set('Content-Type', 'multipart/form-data')

    expect(response.status).toBe(200)
  })
  test('should return correct number of journeys', async () => {
    const response = await request(app)
      .post('/api/stations/add-many')
      .attach('file', fs.readFileSync(stationsCsvFile), 'stations.csv')
      .set('Content-Type', 'multipart/form-data')

    expect(response.body.length).toBe(9)
  })
})
