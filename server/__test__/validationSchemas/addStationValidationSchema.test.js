const Yup = require('yup')
const {
  addStationValidationSchema,
} = require('../../utils/validators/yupValidationSchemas')

const queryParams = {
  Nimi: '',
  Namn: 'station name',
  Name: 'station name',
}

describe('validationSchema', () => {
  describe('Name fields', () => {
    //Nimi
    it('Should throw error when Nimi is empty string', async () => {
      await expect(
        addStationValidationSchema.validate(queryParams)
      ).rejects.toThrow(Yup.ValidationError)
    })
    it('Should throw error when Nimi is doesnt exist', async () => {
      const { Nimi, ...rest } = queryParams
      await expect(addStationValidationSchema.validate(rest)).rejects.toThrow(
        Yup.ValidationError
      )
    })
    it('Should throw error when Name is a number', async () => {
      await expect(
        addStationValidationSchema.validate({ ...queryParams, Nimi: 1 })
      ).rejects.toThrow(Yup.ValidationError)
    })
    it('Should throw error when Name is a boolean', async () => {
      await expect(
        addStationValidationSchema.validate({ ...queryParams, Nimi: true })
      ).rejects.toThrow(Yup.ValidationError)
    })
    it('Should throw error when Name is a null', async () => {
      await expect(
        addStationValidationSchema.validate({ ...queryParams, Nimi: null })
      ).rejects.toThrow(Yup.ValidationError)
    })
    it('Should throw error when Name is a undefined', async () => {
      await expect(
        addStationValidationSchema.validate({ ...queryParams, Nimi: null })
      ).rejects.toThrow(Yup.ValidationError)
    })
    it('Should throw error when Name is a undefined', async () => {
      await expect(
        addStationValidationSchema.validate({ ...queryParams, Nimi: null })
      ).rejects.toThrow(Yup.ValidationError)
    })
    it('Should trim whitespace', () => {
      const result = addStationValidationSchema.validate({
        ...queryParams,
        Nimi: ' whitespace ',
      })
      expect(result.Nimi).toEqual('whitespace')
    })
  })
})
