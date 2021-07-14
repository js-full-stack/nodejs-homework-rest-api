/* eslint space-before-function-paren: ["error", "never"] */

const { User } = require('../db/userModel')
const { Status } = require('../helpers/constants')
const { CustomErr } = require('../helpers/errors')

const usersService = {
  async findUserByEmail(email) {
    const data = await User.findOne({ email })
    return data
  },

  async findUserById(userId) {
    const data = await User.findOne({ _id: userId })
    return data
  },

  async addUser(email, password) {
    const data = await new User({ email, password })
    return data
  },

  async updateToken(userId, token) {
    const data = await User.findByIdAndUpdate(userId, { token }, { new: true })
    if (!data) {
      throw new CustomErr(Status.UNAUTHORIZED, 'Not authorized')
    }
    return data
  },
  async updateAvatar(userId, avatarURL) {
    const changeAvatar = await User.findByIdAndUpdate(userId, avatarURL, {
      new: true
    })
    return changeAvatar
  }
}

module.exports = {
  usersService
}
