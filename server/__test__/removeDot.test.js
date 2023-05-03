const { removeDot } = require('../utils/helpers')

const object = {
  'first field (sec.)': 'value',
}
describe('Test removeDot function', () => {
  test('removeDot removes all dots from object key', () => {
    expect(removeDot(object)).toEqual({ 'first field (sec)': 'value' })
  })
})
