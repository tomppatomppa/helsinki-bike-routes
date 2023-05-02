const fs = require('fs')
function deleteTmpFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('File deleted successfully')
  })
}

module.exports = deleteTmpFile
