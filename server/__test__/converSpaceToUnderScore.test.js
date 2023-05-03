const { convertSpaceToUnderscore } = require('../utils/helpers')

const object = {
  'space between': 'value',
}
describe('Tests for convertSpaceToUnderscore', () => {
  test('replaces spaces in object key with _', () => {
    const result = convertSpaceToUnderscore(object)
    expect(result).toEqual({ space_between: 'value' })
  })
})
