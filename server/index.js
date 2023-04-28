const app = require('./app')
const { PORT } = require('./utils/config')

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
