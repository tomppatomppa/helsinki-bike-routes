const supertest = require('supertest')
const request = supertest
const app = require('../../app')

describe('QueryValidator for Stations', () => {
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
      await request(app).get('/api/stations').query({ limit: '4' }).expect(200)
    })
    test('should return 200 limit is a valid integer between 1-50', async () => {
      await request(app).get('/api/stations').query({ limit: 10 }).expect(200)
    })
  })
  describe('Test offset', () => {
    test('should return 400 when offset is not a positive integer -1', async () => {
      await request(app).get('/api/stations').query({ offset: -1 }).expect(400)
    })
    test('should return 400 when offset is a string', async () => {
      await request(app)
        .get('/api/stations')
        .query({ offset: 'string' })
        .expect(400)
    })
    test('should return 400 when offset a float', async () => {
      await request(app).get('/api/stations').query({ offset: 2.2 }).expect(400)
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
  })
})
