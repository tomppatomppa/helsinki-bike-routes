const validateStation = require('../../utils/validators/validateStation')

const config = require('../config')
const validCsvRow = config.validateStation.validCsvRow

describe('Test for validateStation', () => {
  describe('Validate FID', () => {
    test('returns false if FID is less than 1', () => {
      expect(validateStation({ ...validCsvRow, FID: 0 })).toBe(false)
    })
    test('returns false if FID is not Integer type', () => {
      expect(validateStation({ ...validCsvRow, FID: 'notanINT' })).toBe(false)
    })
    test('returns false if FID is null', () => {
      expect(validateStation({ ...validCsvRow, FID: null })).toBe(false)
    })
    test('returns false if FID is undefined', () => {
      expect(validateStation({ ...validCsvRow, FID: undefined })).toBe(false)
    })
    test('returns false if FID is float', () => {
      expect(validateStation({ ...validCsvRow, FID: 2.2 })).toBe(false)
    })
    test('returns false if FID is string float', () => {
      expect(validateStation({ ...validCsvRow, FID: '2.2' })).toBe(false)
    })
    test('returns true if FID is Integer as string', () => {
      expect(validateStation({ ...validCsvRow, FID: '1' })).toBe(true)
    })
    test('returns true if FID is valid', () => {
      expect(validateStation(validCsvRow)).toBe(true)
    })
  })

  describe('Validate ID', () => {
    test('returns false if ID is less than 1', () => {
      expect(validateStation({ ...validCsvRow, ID: 0 })).toBe(false)
    })
    test('returns false if ID is not Integer type', () => {
      expect(validateStation({ ...validCsvRow, ID: 'notanINT' })).toBe(false)
    })
    test('returns false if ID is null', () => {
      expect(validateStation({ ...validCsvRow, ID: null })).toBe(false)
    })
    test('returns false if ID is undefined', () => {
      expect(validateStation({ ...validCsvRow, ID: undefined })).toBe(false)
    })
    test('returns false if ID is float', () => {
      expect(validateStation({ ...validCsvRow, ID: 2.2 })).toBe(false)
    })
    test('returns false if ID is string float', () => {
      expect(validateStation({ ...validCsvRow, ID: '2.2' })).toBe(false)
    })
    test('returns true if ID is Integer as string', () => {
      expect(validateStation({ ...validCsvRow, ID: '1' })).toBe(true)
    })
    test('returns true if ID is valid', () => {
      expect(validateStation(validCsvRow)).toBe(true)
    })
  })

  describe('Validate station names, FIN, SWE, EN', () => {
    describe('Finnish name tests', () => {
      test('return false if name is not a string', () => {
        expect(validateStation({ ...validCsvRow, Nimi: 2 })).toBe(false)
      })
      test('return false if name is not a valid string', () => {
        expect(validateStation({ ...validCsvRow, Nimi: '2' })).toBe(false)
      })
      test('return false if name is null', () => {
        expect(validateStation({ ...validCsvRow, Nimi: null })).toBe(false)
      })
      test('return false if name is undefined', () => {
        expect(validateStation({ ...validCsvRow, Nimi: undefined })).toBe(false)
      })
      test('return false if name is boolean', () => {
        expect(validateStation({ ...validCsvRow, Nimi: true })).toBe(false)
      })
      test('return true if name is valid string', () => {
        expect(validateStation(validCsvRow)).toBe(true)
      })
    })
    describe('Swedish name tests', () => {
      test('return false if name is not a string', () => {
        expect(validateStation({ ...validCsvRow, Namn: 2 })).toBe(false)
      })
      test('return false if name is not a valid string', () => {
        expect(validateStation({ ...validCsvRow, Namn: '2' })).toBe(false)
      })
      test('return false if name is null', () => {
        expect(validateStation({ ...validCsvRow, Namn: null })).toBe(false)
      })
      test('return false if name is undefined', () => {
        expect(validateStation({ ...validCsvRow, Namn: undefined })).toBe(false)
      })
      test('return false if name is boolean', () => {
        expect(validateStation({ ...validCsvRow, Namn: true })).toBe(false)
      })
      test('return true if name is valid string', () => {
        expect(validateStation(validCsvRow)).toBe(true)
      })
    })
    describe('English name tests', () => {
      test('return false if name is not a string', () => {
        expect(validateStation({ ...validCsvRow, Name: 2 })).toBe(false)
      })
      test('return false if name is not a valid string', () => {
        expect(validateStation({ ...validCsvRow, Name: '2' })).toBe(false)
      })
      test('return false if name is null', () => {
        expect(validateStation({ ...validCsvRow, Name: null })).toBe(false)
      })
      test('return false if name is undefined', () => {
        expect(validateStation({ ...validCsvRow, Name: undefined })).toBe(false)
      })
      test('return false if name is boolean', () => {
        expect(validateStation({ ...validCsvRow, Name: true })).toBe(false)
      })
      test('return true if name is valid string', () => {
        expect(validateStation(validCsvRow)).toBe(true)
      })
    })
  })

  describe('Validate Address, FIN, SWE', () => {
    describe('Finnish address', () => {
      test('returns false if address not a string', () => {
        expect(validateStation({ ...validCsvRow, Osoite: 2 })).toBe(false)
      })
      test('returns false if address is a number', () => {
        expect(validateStation({ ...validCsvRow, Osoite: '2' })).toBe(false)
      })
      test('returns false if address is null', () => {
        expect(validateStation({ ...validCsvRow, Osoite: null })).toBe(false)
      })
      test('returns false if address is undefined', () => {
        expect(validateStation({ ...validCsvRow, Osoite: undefined })).toBe(
          false
        )
      })
      test('returns false if address is boolean', () => {
        expect(validateStation({ ...validCsvRow, Osoite: false })).toBe(false)
      })
      test('returns true if address valid', () => {
        expect(validateStation(validCsvRow)).toBe(true)
      })
    })
    describe('Swedish address', () => {
      test('returns false if address not a string', () => {
        expect(validateStation({ ...validCsvRow, Adress: 2 })).toBe(false)
      })
      test('returns false if address is a number', () => {
        expect(validateStation({ ...validCsvRow, Adress: '2' })).toBe(false)
      })
      test('returns false if address is null', () => {
        expect(validateStation({ ...validCsvRow, Adress: null })).toBe(false)
      })
      test('returns false if address is undefined', () => {
        expect(validateStation({ ...validCsvRow, Adress: undefined })).toBe(
          false
        )
      })
      test('returns false if address is boolean', () => {
        expect(validateStation({ ...validCsvRow, Adress: false })).toBe(false)
      })
      test('returns true if address valid', () => {
        expect(validateStation(validCsvRow)).toBe(true)
      })
    })
  })

  describe('Validate City names, FIN, SWE', () => {
    describe('Kaupunki field', () => {
      test('Should allow empty Kaupunki field', () => {
        expect(validateStation({ ...validCsvRow, Kaupunki: '' })).toBe(true)
      })
      test('Should allow kaupunki field to be null', () => {
        expect(validateStation({ ...validCsvRow, Kaupunki: null })).toBe(true)
      })
      test('Should allow kaupunki field to be string', () => {
        expect(validateStation({ ...validCsvRow, Kaupunki: 'kaupunki' })).toBe(
          true
        )
      })
    })

    describe('Stad field', () => {
      test('Should allow empty Stad field', () => {
        expect(validateStation({ ...validCsvRow, Stad: '' })).toBe(true)
      })
      test('Should allow Stad field to be null', () => {
        expect(validateStation({ ...validCsvRow, Stad: null })).toBe(true)
      })
      test('Should allow Stad field to be string', () => {
        expect(validateStation({ ...validCsvRow, Stad: 'kaupunki' })).toBe(true)
      })
    })
  })
})
describe('Operaattor field', () => {
  test('Should allow empty Operaattor field', () => {
    expect(validateStation({ ...validCsvRow, Operaattor: '' })).toBe(true)
  })
  test('Should allow Operaattor field to be null', () => {
    expect(validateStation({ ...validCsvRow, Operaattor: null })).toBe(true)
  })
  test('Should allow Operaattor field to be string', () => {
    expect(validateStation({ ...validCsvRow, Operaattor: 'operaattor' })).toBe(
      true
    )
  })
})

describe('Validate Kapasiteet field', () => {
  test('returns false if value is not a number', () => {
    expect(
      validateStation({ ...validCsvRow, Kapasiteet: 'not a number' })
    ).toBe(false)
  })
  test('returns false if value is a float', () => {
    expect(validateStation({ ...validCsvRow, Kapasiteet: '1.2' })).toBe(false)
  })
  test('returns false if value is a negative integer', () => {
    expect(validateStation({ ...validCsvRow, Kapasiteet: -1 })).toBe(false)
  })
  test('returns false if value is null', () => {
    expect(validateStation({ ...validCsvRow, Kapasiteet: null })).toBe(false)
  })
  test('returns false if value is undefined', () => {
    expect(validateStation({ ...validCsvRow, Kapasiteet: undefined })).toBe(
      false
    )
  })
  test('returns false if value is boolean', () => {
    expect(validateStation({ ...validCsvRow, Kapasiteet: false })).toBe(false)
  })
  test('returns true if kapasiteet is valid', () => {
    expect(validateStation(validCsvRow)).toBe(true)
  })
})

describe('Validate x coordinate', () => {
  test('Too large value for X coordinate should return false', () => {
    expect(validateStation({ ...validCsvRow, x: 181 })).toBe(false)
  })
  test('Too small value for X coordinate should return false', () => {
    expect(validateStation({ ...validCsvRow, x: -181 })).toBe(false)
  })
  test('Should return false when X coordinate is not a number', () => {
    expect(validateStation({ ...validCsvRow, x: 'notanumber' })).toBe(false)
  })
  test('Should return false when X coordinate is null', () => {
    expect(validateStation({ ...validCsvRow, x: null })).toBe(false)
  })
  test('Should return false when X coordinate is undefined', () => {
    expect(validateStation({ ...validCsvRow, x: undefined })).toBe(false)
  })
  test('Should return true when X coordinate is valid', () => {
    expect(validateStation(validCsvRow)).toBe(true)
  })
})

describe('Validate y coordinate', () => {
  test('Too large value for Y coordinate should return false', () => {
    expect(validateStation({ ...validCsvRow, y: 91 })).toBe(false)
  })
  test('Too small value for Y coordinate should return false', () => {
    expect(validateStation({ ...validCsvRow, y: -91 })).toBe(false)
  })
  test('Should return false when Y coordinate is not a number', () => {
    expect(validateStation({ ...validCsvRow, y: 'notanumber' })).toBe(false)
  })
  test('Should return false when Y coordinate is null', () => {
    expect(validateStation({ ...validCsvRow, y: null })).toBe(false)
  })
  test('Should return false when Y coordinate is undefined', () => {
    expect(validateStation({ ...validCsvRow, y: undefined })).toBe(false)
  })
  test('Should return true when Y coordinate is valid', () => {
    expect(validateStation(validCsvRow)).toBe(true)
  })
})
