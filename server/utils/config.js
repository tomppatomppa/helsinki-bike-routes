const PORT = process.env.PORT || 3001

const DATABASE_URL =
  process.env.NODE_ENV !== 'test'
    ? process.env.DATABASE_URL
    : process.env.TEST_DATABASE_URL

module.exports = { PORT, DATABASE_URL }
