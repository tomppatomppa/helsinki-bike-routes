const app = require('./app')
const { PORT, DATABASE_URL } = require('./utils/config')

console.log(DATABASE_URL)
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
