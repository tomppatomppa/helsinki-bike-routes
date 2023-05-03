const multer = require('multer')

function multerErrors(err, req, res, next) {
  console.log('HERE', err)
  if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading the file
    res.status(400).json({ error: 'File upload error' })
  } else if (err) {
    // Other error occurred
    return res.status(400).json({ error: err.message })
  }
  next()
}

module.exports = multerErrors
