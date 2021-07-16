/* eslint space-before-function-paren: ["error", "never"] */

const { usersService } = require('../services/usersService')
const { CustomErr } = require('../helpers/errors')
const { Status } = require('../helpers/constants')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.JWT_SECRET

const authService = {
  async login(email, password) {
    const user = await usersService.findUserByEmail(email)

    if (!user) {
      throw new CustomErr(
        Status.UNAUTHORIZED,
        `Not found users with email ${email} `
      )
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new CustomErr(Status.UNAUTHORIZED, 'Wrong password')
    }

    const _id = user.id
    const payload = { _id }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '4h' })
    const data = await usersService.updateToken(_id, token)

    return data
  },
  async logout(id) {
    const data = await usersService.updateToken(id, null)
    return data
  }
}
module.exports = {
  authService
}
