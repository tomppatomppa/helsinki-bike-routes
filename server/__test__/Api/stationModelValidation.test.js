const fs = require('fs')
const path = require('path')
const supertest = require('supertest')
const request = supertest
const app = require('../app')

const { connectToDatabase, sequelize } = require('../../utils/database')

beforeAll(async () => {
  await connectToDatabase()
})

afterAll(async () => {
  await sequelize.close()
})
