const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.static('dist'))

app.get('/api', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
