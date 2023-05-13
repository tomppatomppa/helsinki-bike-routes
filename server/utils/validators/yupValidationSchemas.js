const Yup = require('yup')

const addStationValidationSchema = Yup.object().shape({
  Nimi: Yup.string().trim().required().min(3).strict(),
  Namn: Yup.string().trim().required().min(3).strict(),
  Name: Yup.string().trim().required().min(3).strict(),
})
module.exports = { addStationValidationSchema }
