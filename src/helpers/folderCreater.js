const fs = require('fs/promises')
const isAccessible = async path => {
  await fs
    .access(path)
    .then(() => true)
    .catch(() => false)
}

const createFolderIsNotExist = async folder => {
  try {
    if (!(await isAccessible(folder))) {
      await fs.mkdir(folder)
    }
  } catch (error) {
    return error
  }
}

module.exports = {
  createFolderIsNotExist
}
