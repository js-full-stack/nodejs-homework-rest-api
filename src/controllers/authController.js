const { authService } = require('../services/authService')

const { Status } = require('../helpers/constants')

const registrationController = async (req, res) => {
  const { email, password } = req.body
  await authService.registration(email, password)
  return res
    .status(Status.CREATED)
    .json({ message: `user with email ${email} created` })
}

const loginController = async (req, res) => {
  const { email, password } = req.body
  const token = await authService.login(email, password)

  return res
    .status(Status.OK)
    .json({ message: `User with email ${email} authorized`, token })
}

const logoutController = async (req, res) => {
  const { _id: userId } = req.user
  authService.logout(userId)

  return res.status(Status.OK).json({ message: 'logout success' })
}

const getCurrentUserController = async (req, res) => {
  const { email, password } = req.body
  const token = await authService.login(email, password)
  const { subscription } = token
  return res.status(Status.OK).json({ email, subscription })
}

module.exports = {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController
}