const { Sequelize } = require('sequelize')
const { DATABASE_URL } = require('./config')

const sequelize = new Sequelize(DATABASE_URL)

const connectToDatabase = async () => {
  try {
    if (process.env.NODE_ENV === 'test') {
      await sequelize.sync({ force: true })
      console.log('tables dropped and recreated')
    }

    await sequelize.authenticate()
    console.log('connected to the database')
  } catch (err) {
    console.log('failed to connect to the database')
    console.log(err)
    return process.exit(1)
  }

  return null
}

module.exports = {
  connectToDatabase,
  sequelize,
}
