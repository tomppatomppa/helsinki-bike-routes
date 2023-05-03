const validateFileUpload = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No files uploaded' })
  }

  if (file.fieldname !== 'file') {
    return res.status(400).json({ error: 'Invalid file field name' })
  }

  next()
}
module.exports = validateFileUpload
