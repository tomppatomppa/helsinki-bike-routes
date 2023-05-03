const parseRow = require('../validators/parseRow')

const object = {
  'test field (m)': 'value',
  'second field (sec.)': 'value',
}
describe('Test parseRow', () => {
  test('Removes parthesis and replaces spaces with underscore', () => {
    expect(parseRow(object)).toEqual({
      test_field_m: 'value',
      second_field_sec: 'value',
    })
  })
})
