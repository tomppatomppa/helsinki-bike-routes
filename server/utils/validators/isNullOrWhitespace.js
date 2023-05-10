function isNullOrWhitespace(value) {
  return value === undefined || value === null || /^\s*$/.test(value)
}
module.exports = isNullOrWhitespace
