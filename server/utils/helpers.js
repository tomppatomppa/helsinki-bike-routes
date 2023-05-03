function convertSpaceToUnderscore(obj) {
  const result = {}
  for (let key in obj) {
    let newKey = key.replace(/ /g, '_').trim()
    result[newKey] = obj[key]
  }
  return result
}

function removeParethesis(obj) {
  const result = {}
  for (let key in obj) {
    let newKey = key.replace(/[()]/g, '').trim()
    result[newKey] = obj[key]
  }
  return result
}
module.exports = { convertSpaceToUnderscore, removeParethesis }
