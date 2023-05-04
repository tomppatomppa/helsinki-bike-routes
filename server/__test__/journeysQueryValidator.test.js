const supertest = require('supertest')
const request = supertest
const app = require('../app')

describe('journeysQueryValidator', () => {
  test('should return 200 when no params are passed', async () => {
    await request(app).get('/api/journeys').query({}).expect(200)
  })
  test('should return 400 limit is string', async () => {
    await request(app)
      .get('/api/journeys')
      .query({ limit: 'string' })
      .expect(400)
  })
  test('should return 400 limit is string', async () => {
    await request(app).get('/api/journeys').query({ limit: '4' }).expect(400)
  })
})
