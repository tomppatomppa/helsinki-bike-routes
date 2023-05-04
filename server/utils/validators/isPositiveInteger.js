function isPositiveInteger(n) {
  const nString = n.toString(),
    nInt = parseInt(n),
    nFloat = parseFloat(n)
  // if a negative number (works on -0)
  if (nString.charAt(0) === '-') {
    return false
  }
  // if an exponential like 1e10
  if (nString.indexOf('e') > -1) {
    return false
  }
  // if a float number with a zero decimal part e.g 0.0
  if (nFloat === nInt && nString.indexOf('.') > -1) {
    return false
  }
  // if a positive integer
  // https://stackoverflow.com/a/10835227/8470877
  return 0 === n % (!isNaN(nFloat) && 0 <= ~~n)
}

module.exports = isPositiveInteger
