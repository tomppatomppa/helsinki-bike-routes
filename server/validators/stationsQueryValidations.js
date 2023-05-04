const { query } = require('express-validator')

function stationsQueryValidator() {
  return [
    query('limit').default(1).isInt({ min: 1, max: 50 }).withMessage('heelo'),
    query('offset').default(0).isInt({ min: 0 }),
  ]
}

module.exports = stationsQueryValidator
