const { authService } = require('../services/authService')
const { usersService } = require('../services/usersService')
const { CustomErr } = require('../helpers/errors')
const { Status } = require('../helpers/constants')
const EmailService = require('../services/emailVerifyService')
const registrationController = async (req, res, next) => {
  const checkUniqueUser = await usersService.findUserByEmail(req.body.email)
  if (checkUniqueUser) {
    throw new CustomErr(
      Status.CONFLICT,
      `User with email ${req.body.email} exist`
    )
  }

  try {
    const newUser = await usersService.addUser(req.body)
    const { id, name, email, verifyTokenEmail } = newUser
    const emailService = new EmailService(process.env.NODE_ENV)
    await emailService.sendVerifyEmail(verifyTokenEmail, name, email)
    return res.status(Status.CREATED).json({
      message: `user with email ${email} created`,
      id,
      name,
      email,
      verifyTokenEmail
    })
  } catch (error) {
    console.log(error.message)
  }
}

const loginController = async (req, res) => {
  const { email, password } = req.body
  const loggedInUser = await authService.login(email, password)
  // const { token } = loggedInUser
  return res
    .status(Status.OK)
    .json({ message: `User with email ${email} authorized`, loggedInUser })
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
