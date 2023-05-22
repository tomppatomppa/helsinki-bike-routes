const supertest = require('supertest')
const request = supertest
const app = require('../../app')

const { connectToDatabase, sequelize } = require('../../utils/database')
const { Station } = require('../../models')

const station = {
  ID: 1,
  Nimi: 'station1',
  Namn: 'station1',
  Name: 'station1',
  Osoite: 'station1',
  Adress: 'station1',
  Kaupunki: 'station',
  Stad: 'station',
  Operaattor: 'station1',
  Kapasiteet: 20,
  x: 60.0,
  y: 60.0,
}

beforeAll(async () => {
  await new Promise((resolve) => setTimeout(resolve, 200))
  await connectToDatabase()
})

afterAll(async () => {
  await sequelize.close()
})

describe('/api/station/add-single', () => {
  beforeEach(async () => {
    await Station.truncate({ cascade: true, restartIdentity: true })
  })
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
    test('Return 400 when ID is missing', async () => {
      const { ID, ...rest } = station
      const response = await request(app)
        .post('/api/stations/add-single')
        .send(rest)
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', [
        'station.ID cannot be null',
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
    test('Returns 400 when Nimi is missing', async () => {
      const { Nimi, ...rest } = station
      const response = await request(app)
        .post('/api/stations/add-single')
        .send(rest)
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', [
        'station.Nimi cannot be null',
      ])
    })
    test('Returns 400 when Nimi is missing', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, Nimi: '' })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', [
        'Validation len on Nimi failed',
      ])
    })
    test('Returns 400 when Nimi length is < 3', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, Nimi: '12' })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', [
        'Validation len on Nimi failed',
      ])
    })
    test('Returns 400 when Nimi length is > 50', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, Nimi: 'a'.repeat(51) })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', [
        'Validation len on Nimi failed',
      ])
    })
    test('Returns 200 when Nimi is valid', async () => {
      await request(app)
        .post('/api/stations/add-single')
        .send(station)
        .expect(200)
    })
  })
  describe('Namn', () => {
    test('Returns 400 when Namn is missing', async () => {
      const { Namn, ...rest } = station
      const response = await request(app)
        .post('/api/stations/add-single')
        .send(rest)
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', [
        'station.Namn cannot be null',
      ])
    })
    test('Returns 400 when Namn is missing', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, Namn: '' })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', [
        'Validation len on Namn failed',
      ])
    })
    test('Returns 400 when Namn length is < 3', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, Namn: '12' })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', [
        'Validation len on Namn failed',
      ])
    })
    test('Returns 400 when Namn length is > 50', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, Namn: 'a'.repeat(51) })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', [
        'Validation len on Namn failed',
      ])
    })
    test('Returns 200 when Namn is valid', async () => {
      await request(app)
        .post('/api/stations/add-single')
        .send(station)
        .expect(200)
    })
  })
  describe('Name', () => {
    test('Returns 400 when Name is missing', async () => {
      const { Name, ...rest } = station
      const response = await request(app)
        .post('/api/stations/add-single')
        .send(rest)
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', [
        'station.Name cannot be null',
      ])
    })
    test('Returns 400 when Name is missing', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, Name: '' })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', [
        'Validation len on Name failed',
      ])
    })
    test('Returns 400 when Name length is < 3', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, Name: '12' })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', [
        'Validation len on Name failed',
      ])
    })
    test('Returns 400 when Name length is > 50', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, Name: 'a'.repeat(51) })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', [
        'Validation len on Name failed',
      ])
    })
    test('Returns 200 when Name is valid', async () => {
      await request(app)
        .post('/api/stations/add-single')
        .send(station)
        .expect(200)
    })
  })
  describe('Osoite', () => {
    test('Returns 400 when Osoite is missing', async () => {
      const { Osoite, ...rest } = station
      const response = await request(app)
        .post('/api/stations/add-single')
        .send(rest)
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', [
        'station.Osoite cannot be null',
      ])
    })
    test('Returns 400 when Osoite is missing', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, Osoite: '' })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', [
        'Validation len on Osoite failed',
      ])
    })
    test('Returns 400 when Osoite length is < 3', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, Osoite: '12' })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', [
        'Validation len on Osoite failed',
      ])
    })
    test('Returns 400 when Osoite length is > 50', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, Osoite: 'a'.repeat(51) })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', [
        'Validation len on Osoite failed',
      ])
    })
    test('Returns 200 when Osoite is valid', async () => {
      await request(app)
        .post('/api/stations/add-single')
        .send(station)
        .expect(200)
    })
  })
  describe('Adress', () => {
    test('Returns 400 when Adress is missing', async () => {
      const { Adress, ...rest } = station
      const response = await request(app)
        .post('/api/stations/add-single')
        .send(rest)
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', [
        'station.Adress cannot be null',
      ])
    })
    test('Returns 400 when Adress is missing', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, Adress: '' })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', [
        'Validation len on Adress failed',
      ])
    })
    test('Returns 400 when Adress length is < 3', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, Adress: '12' })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', [
        'Validation len on Adress failed',
      ])
    })
    test('Returns 400 when Adress length is > 50', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, Adress: 'a'.repeat(51) })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', [
        'Validation len on Adress failed',
      ])
    })
    test('Returns 200 when Adress is valid', async () => {
      await request(app)
        .post('/api/stations/add-single')
        .send(station)
        .expect(200)
    })
  })
  describe('Kaupunki', () => {
    test('Removes whitespace from string', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, Kaupunki: ' whitespace ' })
      expect(response.body.Kaupunki).toEqual('whitespace')
    })
    test('Returns 200 when Kaupunki is null', async () => {
      await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, Kaupunki: null })
        .expect(200)
    })
    test('Returns 200 when Kaupunki is undefined', async () => {
      await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, Kaupunki: undefined })
        .expect(200)
    })
    test('Returns 200 when Kaupunki is empty string', async () => {
      await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, Kaupunki: '' })
        .expect(200)
    })
    test('Returns 200 when Kaupunki doesnt exist', async () => {
      const { Kaupunki, ...rest } = station
      const response = await request(app)
        .post('/api/stations/add-single')
        .send(rest)
      expect(response.status).toBe(200)
      expect(response.body.Kaupunki).toBe(null)
    })
    test('Returns 200 when Kaupunki is valid', async () => {
      await request(app)
        .post('/api/stations/add-single')
        .send(station)
        .expect(200)
    })
  })
  describe('Stad', () => {
    test('Removes whitespace from string', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, Stad: ' whitespace ' })
      expect(response.body.Stad).toEqual('whitespace')
    })
    test('Returns 200 when Stad is null', async () => {
      await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, Stad: null })
        .expect(200)
    })
    test('Returns 200 when Stad is undefined', async () => {
      await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, Stad: undefined })
        .expect(200)
    })
    test('Returns 200 when Stad is empty string', async () => {
      await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, Stad: '' })
        .expect(200)
    })
    test('Returns 200 when Stad doesnt exist', async () => {
      const { Stad, ...rest } = station
      const response = await request(app)
        .post('/api/stations/add-single')
        .send(rest)
      expect(response.status).toBe(200)
      expect(response.body.Stad).toBe(null)
    })
    test('Returns 200 when Stad is valid', async () => {
      await request(app)
        .post('/api/stations/add-single')
        .send(station)
        .expect(200)
    })
  })
  describe('Operaattor', () => {
    test('Returns 200 when Operaattor is int', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, Operaattor: 121 })
      expect(response.status).toBe(200)
    })
    test('Removes whitespace from string', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, Operaattor: ' whitespace ' })
      expect(response.body.Operaattor).toEqual('whitespace')
    })
    test('Returns 200 when Operaattor is null', async () => {
      await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, Operaattor: null })
        .expect(200)
    })
    test('Returns 200 when Operaattor is undefined', async () => {
      await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, Operaattor: undefined })
        .expect(200)
    })
    test('Returns 200 when Operaattor is empty string', async () => {
      await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, Operaattor: '' })
        .expect(200)
    })
    test('Returns 200 when Operaattor doesnt exist', async () => {
      const { Operaattor, ...rest } = station
      const response = await request(app)
        .post('/api/stations/add-single')
        .send(rest)
      expect(response.status).toBe(200)
      expect(response.body.Operaattor).toBe(null)
    })
    test('Returns 200 when Operaattor is valid', async () => {
      await request(app)
        .post('/api/stations/add-single')
        .send(station)
        .expect(200)
    })
  })
  describe('Kapasiteet', () => {
    test('Returns 400 when field doesnt exist', async () => {
      const { Kapasiteet, ...rest } = station
      const response = await request(app)
        .post('/api/stations/add-single')
        .send(rest)
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', [
        'station.Kapasiteet cannot be null',
      ])
    })
    test('Returns 400 when non positive int', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, Kapasiteet: -1 })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', [
        'Validation min on Kapasiteet failed',
      ])
    })
    test('Returns 400 when not int', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, Kapasiteet: 1.2 })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', [
        'Validation isInt on Kapasiteet failed',
      ])
    })
    test('Returns 400 when string', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, Kapasiteet: 'string' })
      expect(response.status).toBe(400)
    })
    test('Returns 200 when numeric int string', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, Kapasiteet: '12' })
      expect(response.status).toBe(200)
    })
    test('Returns 200 when int', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send(station)
      expect(response.status).toBe(200)
    })
  })
  describe('x latitude', () => {
    test('Returns 400 when x is < -90', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, x: -91 })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', [
        'Validation min on x failed',
      ])
    })
    test('Returns 400 when x is > 90', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, x: 91 })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', [
        'Validation max on x failed',
      ])
    })
    test('Returns 400 when x is non numeric', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, x: 'hello' })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', [
        'Validation isNumeric on x failed',
      ])
    })
    test('Returns 200 when x valid', async () => {
      await request(app)
        .post('/api/stations/add-single')
        .send(station)
        .expect(200)
    })
  })
  describe('y longitude', () => {
    test('Returns 400 when y is < -180', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, y: -181 })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', [
        'Validation min on y failed',
      ])
    })
    test('Returns 400 when y is > 180', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, y: 181 })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', [
        'Validation max on y failed',
      ])
    })
    test('Returns 400 when y is non numeric', async () => {
      const response = await request(app)
        .post('/api/stations/add-single')
        .send({ ...station, y: 'hello' })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', [
        'Validation isNumeric on y failed',
      ])
    })
    test('Returns 200 when y valid', async () => {
      await request(app)
        .post('/api/stations/add-single')
        .send(station)
        .expect(200)
    })
  })
})
