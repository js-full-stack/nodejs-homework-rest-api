const { Status } = require('../helpers/constants')
const jimp = require('jimp')
const path = require('path')
const fs = require('fs/promises')
const { usersService } = require('../services/usersService')
const { avatarStorage } = require('./constants')

const avatarUploadHandler = async req => {
  const filePath = req.file.path
  const fileName = req.file.originalname
  const FINISH_FOLDER_AVATAR = process.env.IMAGE_DIR
  const newNameAvatar = `${fileName}`
  if (req.file) {
    const img = await jimp.read(filePath)
    await img
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(filePath)

    try {
      await fs.rename(
        filePath,
        path.join(avatarStorage.PERMANENT, `${fileName}`)
      )
    } catch (error) {
      console.log(error.message)
    }
  }
  const oldAvatar = req.user.avatarURL
  if (oldAvatar.includes(`${FINISH_FOLDER_AVATAR}`)) {
    await fs.unlink(path.join(process.cwd(), 'public', oldAvatar))
  }
  return path.join(FINISH_FOLDER_AVATAR, newNameAvatar).replace('\\', '/')
}

const updateAvatar = async (req, res, next) => {
  const { _id: userId } = req.user
  const avatarURL = await avatarUploadHandler(req)
  await usersService.updateAvatar(userId, avatarURL)

  return res.status(Status.OK).json({ status: 'success', data: { avatarURL } })
}

module.exports = { updateAvatar }
