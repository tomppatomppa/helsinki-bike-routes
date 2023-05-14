const supertest = require('supertest')
const request = supertest
const app = require('../../app')

const { connectToDatabase, sequelize } = require('../../utils/database')
const { csvData } = require('./createData')
beforeAll(async () => {
  await connectToDatabase()
})

afterAll(async () => {
  await sequelize.close()
})

describe('File validation /api/journeys/add-many', () => {
  describe('Test sending invalid files to the endpoint', () => {
    test('Should return 400 when nothing is sent', async () => {
      await request(app).post('/api/journeys/add-many').expect(400)
    })
    test('Should return 400 when wrong filetype is sent', async () => {
      const csvBuffer = Buffer.from(csvData)
      await request(app)
        .post('/api/journeys/add-many')
        .attach('file', csvBuffer, 'textfile.txt')
        .set('Content-Type', 'multipart/form-data')
        .expect(400)
    })
    test('Should return 400 when file KEY is not "file"', async () => {
      const csvBuffer = Buffer.from(csvData)
      await request(app)
        .post('/api/journeys/add-many')
        .attach('errorKey', csvBuffer, 'journeys.csv')
        .set('Content-Type', 'multipart/form-data')
        .expect(400)
    })
    test('Should return error message, but no file error', async () => {
      const csvBuffer = Buffer.from(csvData)
      const response = await request(app)
        .post('/api/journeys/add-many')
        .attach('file', csvBuffer, 'journeys.csv')
        .set('Content-Type', 'multipart/form-data')

      expect(response.body.error).toEqual('No valid journeys')
    })
  })
})
