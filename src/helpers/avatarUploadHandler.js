const jimp = require('jimp')
const path = require('path')
const fs = require('fs/promises')
const { avatarStorage } = require('./constants')

const avatarUploadHandler = async (req, res, next) => {
  if (req.file) {
    // todo: fs.rename( oldPath, newPath, callback )

    const { file } = req
    const img = await jimp.read(file.path)
    await img
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(file.path)

    await fs.rename(
      file.path,
      path.join(avatarStorage.PERMANENT, file.originalname)
    )
  }
}

module.exports = avatarUploadHandler
