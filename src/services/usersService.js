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

  async addUser(userOptions) {
    const data = await new User(userOptions)
    return await data.save()
  },

  async findUserByVerifyTokenEmail(token) {
    const data = await User.findOne({ verifyTokenEmail: token })
    return data
  },

  async updateToken(userId, token) {
    const data = await User.findByIdAndUpdate(userId, { token }, { new: true })
    if (!data) {
      throw new CustomErr(Status.UNAUTHORIZED, 'Not authorized')
    }
    return data
  },

  async updateVerifyToken(userId, verify, verifyToken) {
    return await User.updateOne(
      { userId },
      { verify, verifyTokenEmail: verifyToken }
    )
  },

  async updateAvatar(userId, avatar) {
    return await User.updateOne({ userId }, { avatar })
  }
}

module.exports = {
  usersService
}
