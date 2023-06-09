const { query } = require('express-validator')

function validateStationsQueryParams() {
  return [
    query('limit').default(1).isInt({ min: 1, max: 50 }),
    query('offset').default(0).isInt(),
    query('search_field')
      .optional()
      .custom((values) => {
        const array = values.split(',')
        const allowedValues = ['Nimi', 'Namn', 'Name', 'Osoite', 'Adress', '']
        const invalidValues = array.filter(
          (item) => !allowedValues.includes(item.trim())
        )
        if (invalidValues.length > 0) {
          throw new Error(
            `Invalid search_field value(s): ${invalidValues.join(', ')}`
          )
        }

        return true
      }),
  ]
}

function validateStationIdQueryParams() {
  return [
    query('startDate').default('2000-01-01').isDate(),
    query('endDate').default('2100-12-31').isDate(),
  ]
}
module.exports = { validateStationsQueryParams, validateStationIdQueryParams }
