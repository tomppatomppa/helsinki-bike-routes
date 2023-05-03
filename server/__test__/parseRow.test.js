const parseRow = require('../validators/parseRow')

const object = {
  'test field (m)': 'value',
  'second field (s)': 'value',
}
describe('Test parseRow', () => {
  test('Removes parthesis and replaces spaces with underscore', () => {
    expect(parseRow(object)).toEqual({
      test_field_m: 'value',
      second_field_s: 'value',
    })
  })
})
