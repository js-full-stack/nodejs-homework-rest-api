const multer = require('multer')
const { avatarStorage } = require('../helpers/constants')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, avatarStorage.TEMPRORARY)
  },
  filename: (req, file, cb) => {
    const [filename, extension] = file.originalname.split('.')
    cb(null, `${filename}$.${extension}`)
  }
})
const upload = multer({
  storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true)
      return
    }
    return cb(null, false)
  }
})

module.exports = upload
