function isFloat(value) {
  if (
    typeof value === 'number' &&
    !Number.isNaN(value) &&
    !Number.isInteger(value)
  ) {
    return true
  } else if (typeof value === 'string') {
    const num = parseFloat(value)
    return !Number.isNaN(num) && !Number.isInteger(num)
  } else {
    return false
  }
}

module.exports = isFloat
