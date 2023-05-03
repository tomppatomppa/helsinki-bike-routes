const { removeParethesis } = require('../utils/helpers')

const object = {
  'space between (m)': 'value',
}
describe('Tests for removeParethesis', () => {
  test('removes parenthesis within object key', () => {
    const result = removeParethesis(object)
    expect(result).toEqual({ 'space between m': 'value' })
  })
})
