function isNonEmptyString(value) {
  if (typeof value === 'string' && isNaN(Number(value))) {
    return true
  }
  return false
}
module.exports = isNonEmptyString
