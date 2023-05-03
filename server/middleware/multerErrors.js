const multer = require('multer')
function multerErrors(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading the file
    res.status(400).json({ error: 'File upload error' })
  } else {
    // Some other error occurred
    res.status(500).json({ error: 'Internal server error' })
  }
  next()
}

module.exports = multerErrors
