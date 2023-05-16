const supertest = require('supertest')
const request = supertest
const app = require('../../app')

const { csvData } = require('./createData')

describe('File validation /api/stations/add-many', () => {
  describe('Test sending invalid files to the endpoint', () => {
    test('Should return 400 when nothing is sent', async () => {
      await request(app).post('/api/stations/add-many').expect(400)
    })
    test('Should return 400 when wrong filetype is sent', async () => {
      const csvBuffer = Buffer.from(csvData)
      await request(app)
        .post('/api/stations/add-many')
        .attach('file', csvBuffer, 'textfile.txt')
        .set('Content-Type', 'multipart/form-data')
        .expect(400)
    })
    test('Should return 400 when file KEY is not "file"', async () => {
      const csvBuffer = Buffer.from(csvData)
      await request(app)
        .post('/api/stations/add-many')
        .attach('errorKey', csvBuffer, 'stations.csv')
        .set('Content-Type', 'multipart/form-data')
        .expect(400)
    })
    test('Should return 200 when file is valid', async () => {
      const csvBuffer = Buffer.from(csvData)
      await request(app)
        .post('/api/stations/add-many')
        .attach('file', csvBuffer, 'stations.csv')
        .set('Content-Type', 'multipart/form-data')
        .expect(200)
    })
  })
})
