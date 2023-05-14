const { query } = require('express-validator')

function stationsQueryValidator() {
  return [
    query('limit').default(1).isInt({ min: 1, max: 50 }),
    query('offset').default(0).isInt(),
    query('search_field')
      .optional()
      .isIn(['Nimi', 'Namn', 'Name', 'Osoite', 'Adress', '']),
  ]
}

module.exports = stationsQueryValidator
