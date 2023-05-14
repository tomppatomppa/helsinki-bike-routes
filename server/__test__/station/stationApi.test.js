const supertest = require('supertest')
const request = supertest
const app = require('../../app')
const { Blob } = require('buffer')
const { connectToDatabase, sequelize } = require('../../utils/database')
const { Station } = require('../../models')
const {
  csvData,
  stationsWithoutOptionalFields,
  stationsWithInvalidCoordinates,
  stationsWithInvalidNames,
  stationsWithInvalidAddress,
  stationsWithInvalidKapasiteet,
} = require('./createData')

beforeAll(async () => {
  await connectToDatabase()
})

afterAll(async () => {
  await sequelize.close()
})

describe('/api/stations/add-many', () => {
  test('Adding stations from csv with invalid coordinates should add 0', async () => {
    const csvBuffer = Buffer.from(stationsWithInvalidCoordinates)
    await request(app)
      .post('/api/stations/add-many')
      .attach('file', csvBuffer, 'stations.csv')
      .set('Content-Type', 'multipart/form-data')
      .expect(200)

    const stations = await Station.findAll()
    expect(stations).toHaveLength(0)
  })
  test('Adding stations from csv with invalid Name/Nimi/Namn should add 0 stations', async () => {
    const csvBuffer = Buffer.from(stationsWithInvalidNames)
    await request(app)
      .post('/api/stations/add-many')
      .attach('file', csvBuffer, 'stations.csv')
      .set('Content-Type', 'multipart/form-data')
      .expect(200)

    const stations = await Station.findAll()
    expect(stations).toHaveLength(0)
  })
  test('Adding stations from csv with invalid Name/Nimi/Namn should add 0 stations', async () => {
    const csvBuffer = Buffer.from(stationsWithInvalidAddress)
    await request(app)
      .post('/api/stations/add-many')
      .attach('file', csvBuffer, 'stations.csv')
      .set('Content-Type', 'multipart/form-data')
      .expect(200)

    const stations = await Station.findAll()
    expect(stations).toHaveLength(0)
  })
  test('Adding stations from csv with invalid Name/Nimi/Namn should add 0 stations', async () => {
    const csvBuffer = Buffer.from(stationsWithInvalidKapasiteet)
    await request(app)
      .post('/api/stations/add-many')
      .attach('file', csvBuffer, 'stations.csv')
      .set('Content-Type', 'multipart/form-data')
      .expect(200)

    const stations = await Station.findAll()
    expect(stations).toHaveLength(0)
  })

  test('Should return 200 and 3 stations to exist in the database', async () => {
    const csvBuffer = Buffer.from(stationsWithoutOptionalFields)
    await request(app)
      .post('/api/stations/add-many')
      .attach('file', csvBuffer, 'stations.csv')
      .set('Content-Type', 'multipart/form-data')
      .expect(200)
    const stations = await Station.findAll()
    expect(stations).toHaveLength(3)
  })
  test('Should return 200 and 9 stations to exist in the database', async () => {
    const csvBuffer = Buffer.from(csvData)
    await request(app)
      .post('/api/stations/add-many')
      .attach('file', csvBuffer, 'stations.csv')
      .set('Content-Type', 'multipart/form-data')
      .expect(200)
    const stations = await Station.findAll()
    expect(stations).toHaveLength(9)
  })
})
