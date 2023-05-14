const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './tmp/csv')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 200 * 1024 * 1024, // 5MB
    files: 1,
  },
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    if (ext !== '.csv') {
      const error = new Error('Only CSV files are allowed')
      error.statusCode = 400
      return cb(error)
    }
    cb(null, true)
  },
})

module.exports = upload
