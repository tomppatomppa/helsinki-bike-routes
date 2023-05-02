const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './tmp/csv')
  },
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
    files: 1,
  },
  fileFilter: function (req, file, cb) {
    cb(null, true)
  },
})

module.exports = upload
