const supertest = require('supertest')
const request = supertest
const app = require('../../app')
const { Station } = require('../../models')
const { connectToDatabase, sequelize } = require('../../utils/database')

beforeAll(async () => {
  await new Promise((resolve) => setTimeout(resolve, 200))
  await connectToDatabase()
})

afterAll(async () => {
  await sequelize.close()
})

describe('stationsQueryValidators.js', () => {
  describe('validateStationsQueryParams', () => {
    test('should return 200 when no params are passed', async () => {
      await request(app).get('/api/stations').query({}).expect(200)
    })
    describe('Limit tests', () => {
      test('should return 400 when limit is string', async () => {
        await request(app)
          .get('/api/stations')
          .query({ limit: 'string' })
          .expect(400)
      })
      test('should return 400 when limit is a float', async () => {
        await request(app)
          .get('/api/stations')
          .query({ limit: '4.4' })
          .expect(400)
      })
      test('should return 400 when limit is over 50', async () => {
        await request(app).get('/api/stations').query({ limit: 51 }).expect(400)
      })
      test('should return 400 when limit is not a positive integer -1', async () => {
        await request(app).get('/api/stations').query({ limit: -1 }).expect(400)
      })
      test('should return 400 when limit is zero', async () => {
        await request(app).get('/api/stations').query({ limit: 0 }).expect(400)
      })
      test('should return 200 limit is a number as string', async () => {
        await request(app)
          .get('/api/stations')
          .query({ limit: '4' })
          .expect(200)
      })
      test('should return 200 limit is a valid integer between 1-50', async () => {
        await request(app).get('/api/stations').query({ limit: 10 }).expect(200)
      })
    })
    describe('Test offset', () => {
      test('should return 400 when offset is not a positive integer -1', async () => {
        await request(app)
          .get('/api/stations')
          .query({ offset: -1 })
          .expect(400)
      })
      test('should return 400 when offset is a string', async () => {
        await request(app)
          .get('/api/stations')
          .query({ offset: 'string' })
          .expect(400)
      })
      test('should return 400 when offset is a float', async () => {
        await request(app)
          .get('/api/stations')
          .query({ offset: 2.2 })
          .expect(400)
      })
      test('should return 200 when offset is a number string', async () => {
        await request(app)
          .get('/api/stations')
          .query({ offset: '20' })
          .expect(200)
      })
      test('should return 200 when offset is 0', async () => {
        await request(app).get('/api/stations').query({ offset: 0 }).expect(200)
      })
    })
    describe('Test search_field', () => {
      test('should return 400 when search_field is not a valid field', async () => {
        await request(app)
          .get('/api/stations')
          .query({ search_field: 'Invalid' })
          .expect(400)
      })
      test('should return 400 when search_field is not a valid field', async () => {
        await request(app)
          .get('/api/stations')
          .query({ search_field: ['Invalid', 'Nimi'] })
          .expect(400)
      })
      test('should return 200 when search_field empty', async () => {
        await request(app)
          .get('/api/stations')
          .query({ search_field: [] })
          .expect(200)
      })
      test('should return 200 when search_field empty', async () => {
        await request(app)
          .get('/api/stations')
          .query({ search_field: '' })
          .expect(200)
      })
      test('should return 200 when valid search_field empty', async () => {
        await request(app)
          .get('/api/stations')
          .query({ search_field: 'Name' })
          .expect(200)
      })
    })
  })

  describe('validateStationIdQueryParams', () => {
    test('Should return 400 when startDate is not a valid date', async () => {
      await request(app)
        .get('/api/stations/501')
        .query({ startDate: 'notadate' })
        .expect(400)
    })
    test('Should return 400 when endDate is not a valid date', async () => {
      await request(app)
        .get('/api/stations/501')
        .query({ endDate: 'notadate' })
        .expect(400)
    })
    test('Should return 400 when both dates are invalid', async () => {
      await request(app)
        .get('/api/stations/501')
        .query({ startDate: 'aDate', endDate: 'notadate' })
        .expect(400)
    })
    test('Should not throw error related to query params when valid dates', async () => {
      await request(app)
        .get('/api/stations/501')
        .query({ startDate: '2023-05-22', endDate: '2023-05-22' })
        .expect(404) //Station doesnt exist error
    })
  })
})
