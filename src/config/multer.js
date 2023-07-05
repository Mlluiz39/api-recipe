const multer = require('multer')
const { v4 } = require('uuid')
const { extname, resolve } = require('path')

module.exports = {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, cb) => {
      return cb(null, v4() + extname(file.originalname))
    },
  }),
}