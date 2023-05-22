const { query } = require('express-validator')

function journeysQueryValidator() {
  return [
    query('limit').default(1).isInt({ min: 1, max: 50 }),
    query('offset').default(0).isInt(),
    query('order')
      .default(['id', 'ASC'])
      .isArray()
      .custom((value) => {
        if (value.length !== 2) {
          throw new Error('Order array must have exactly two values')
        }
        if (value[1] !== 'ASC' && value[1] !== 'DESC') {
          throw new Error('Order array must be either ASC or DESC')
        }
        return true
      }),
    query('search_field')
      .optional()
      .isIn(['Departure_station_name', 'Return_station_name', '']),
  ]
}

module.exports = journeysQueryValidator
