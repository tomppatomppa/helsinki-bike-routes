const validateFileUpload = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No files uploaded' })
  }

  next()
}
module.exports = validateFileUpload
