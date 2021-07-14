const jimp = require('jimp')
const path = require('path')
const fs = require('fs/promises')
const { avatarStorage } = require('./constants')

const avatarUploadHandler = async (req, res, next) => {
  const { file } = req
  const { filename } = file
  if (req.file) {
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
      path.join(avatarStorage.PERMANENT, `${filename}`)
    )
  }

  res.json({ status: 'success' })
}

module.exports = avatarUploadHandler
