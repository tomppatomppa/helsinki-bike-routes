const supertest = require('supertest')
const request = supertest
const app = require('../../app')

const { connectToDatabase, sequelize } = require('../../utils/database')
const { Station } = require('../../models')

beforeAll(async () => {
  await connectToDatabase()
})

afterAll(async () => {
  await sequelize.close()
})

const station = {
  ID: 1,
  Nimi: 'station1',
  Namn: 'station1',
  Name: 'station1',
  Osoite: 'station1',
  Adress: 'station1',
  Kaupunki: 'station1',
  Stad: 'station1',
  Operaattor: 'station1',
  Kapasiteet: 20,
  x: 60.0,
  y: 60.0,
}

beforeEach(async () => {
  await Station.truncate({ cascade: true, restartIdentity: true })
})

describe('/api/station/add-single', () => {
  describe('ID', () => {
    test('Return 400, and validation error when ID is not positive integer', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, ID: 0 })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', [
        'Validation min on ID failed',
      ])
    })
    test('Return 400 when ID is not integer', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, ID: '' })
      expect(response.status).toBe(400)
    })
    test('Return 400 when ID is float', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, ID: 1.1 })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', [
        'Validation isInt on ID failed',
      ])
    })
    test('Return 200 when ID is valid', async () => {
      await request(app)
        .post('/api/stations/add-single')
        .send(station)
        .expect(200)
    })
    test('Return 400 when ID duplicate', async () => {
      await request(app)
        .post('/api/stations/add-single')
        .send(station)
        .expect(200)
      await request(app)
        .post('/api/stations/add-single')
        .send(station)
        .expect(400)
    })
  })
  describe('Nimi', () => {
    test('empty', async () => {
      const all = await Station.findAll()
      expect(all).toHaveLength(0)
    })
  })
})
