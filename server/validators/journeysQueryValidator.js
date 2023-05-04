const { query } = require('express-validator')

function journeysQueryValidator() {
  return [
    query('limit').default(1).isInt({ min: 1, max: 50 }),
    query('offset').default(0).isInt(),
  ]
}

module.exports = journeysQueryValidator
