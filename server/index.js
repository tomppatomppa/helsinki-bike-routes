const app = require('./app')
const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/database')

const start = async () => {
  connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })
}

start()
