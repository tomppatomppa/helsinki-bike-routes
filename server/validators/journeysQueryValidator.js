const { query } = require('express-validator')

function journeysQueryValidator() {
  return [
    query('limit').default(1).isInt({ min: 1, max: 50 }),
    query('offset').default(0).isInt(),
    query('order')
      .optional()
      .default(['id', 'ASC'])
      .isArray()
      .custom((value) => {
        if (value.length !== 2) {
          throw new Error('Order array must have exactly two values')
        }
        return true
      }),
  ]
}

module.exports = journeysQueryValidator
