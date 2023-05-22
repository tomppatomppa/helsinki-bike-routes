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
        console.log(array)
        return true
      }),
  ]
}

const formatDateToISO8601 = (value, { req }) => {
  if (value && !isNaN(Date.parse(value))) {
    // Parse the date string to a Date object
    const date = new Date(value)
    // Format the date to ISO 8601 format
    const formattedDate = date.toISOString().split('T')[0]
    return formattedDate
  }
  // Return the value as is if it is not a valid date
  return value
}
function validateStationIdQueryParams() {
  return [
    query('startDate').default('2000-01-01').custom(formatDateToISO8601),
    query('endDate').default('2100-12-31').custom(formatDateToISO8601),
  ]
}
module.exports = { validateStationsQueryParams, validateStationIdQueryParams }
