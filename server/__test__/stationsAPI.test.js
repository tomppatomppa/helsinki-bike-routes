const fs = require('fs')
const path = require('path')
const supertest = require('supertest')
const request = supertest
const app = require('../app')

const { connectToDatabase, sequelize } = require('../utils/database')
const { Station } = require('../models/index')

const stationsCsvFile = path.join(__dirname, './files/testfile_stations.csv')
const textfile = path.join(__dirname, './files/textfile.txt')

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
  // test('should return correct number of stations', async () => {
  //   const response = await request(app)
  //     .post('/api/stations/add-many')
  //     .attach('file', fs.readFileSync(stationsCsvFile), 'stations.csv')
  //     .set('Content-Type', 'multipart/form-data')

  //   expect(response.body.length).toBe(9)
  // })
  describe('Error sending file', () => {
    test('Sending nothing to /add-many should throw 400 error', async () => {
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
})
