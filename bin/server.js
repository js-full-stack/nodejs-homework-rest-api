require('dotenv').config()
const { connectMongo } = require('../src/db/connection')
const { createFolderIsNotExist } = require('../src/helpers/folderCreater')
const { avatarStorage } = require('../src/helpers/constants')

const app = require('../app')

const PORT = process.env.PORT || 4150

const start = async () => {
  try {
    await connectMongo()
    app.listen(PORT, async () => {
      console.log(`Server works at port ${PORT}!`)
      await createFolderIsNotExist(avatarStorage.TEMPRORARY)
      await createFolderIsNotExist(avatarStorage.PERMANENT)
    })
  } catch (error) {
    console.error(error)
  }
}

start()
