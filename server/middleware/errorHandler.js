const multer = require('multer')
const { getNextAvailableID } = require('../utils/helpers')

async function errorHandler(error, req, res, next) {
  if (error instanceof multer.MulterError) {
    res.status(400).json({ error: 'File upload error' })
  } else if (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).send({
        error: error.errors.map((e) => e.message),
      })
    }
    if (error.name === 'SequelizeDatabaseError') {
      console.log(error)
      return res.status(400).send({
        error: 'bad data...',
      })
    }
    if (error.name === 'SequelizeUniqueConstraintError') {
      if (error.fields.ID) {
        const id = await getNextAvailableID()
        return res.status(400).json({ nextAvailableID: id })
      }
      return res.status(400).send({
        error: error.errors.map((e) => e.message),
      })
    }
    return res.status(400).json({ error: error.message })
  }
  next()
}

module.exports = errorHandler
