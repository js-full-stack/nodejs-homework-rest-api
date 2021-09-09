const { Status } = require('../helpers/constants')
const { EmailService } = require('../services/emailVerifyService')
const { usersService } = require('../services/usersService')

const verifyEmailController = async (req, res, next) => {
  try {
    const user = await usersService.findUserByVerifyTokenEmail(req.params.token)
    if (user) {
      await usersService.updateVerifyToken(user.id, true, null)
      return res.status(Status.OK).json({
        status: 'success',
        code: Status.OK,
        data: { message: 'Verification successful' }
      })
    }
    return res.status(Status.BAD_REQUEST).json({
      status: 'error',
      code: Status.BAD_REQUEST,
      message: 'Invalid token. Contact to administration'
    })
  } catch (error) {
    next(error)
  }
}
const tryAgainVerifyEmailController = async (req, res, next) => {
  try {
    const user = await usersService.findUserByEmail(req.body.email)
    if (user) {
      const { name, verifyTokenEmail, email } = user
      const emailService = new EmailService(process.env.NODE_ENV)
      await emailService.sendVerifyEmail(verifyTokenEmail, email, name)
      return res.status(Status.OK).json({
        status: 'success',
        code: Status.OK,
        data: { message: 'Verification email resubmitted' }
      })
    }
    return res.status(Status.NOT_FOUND).json({
      status: 'error',
      code: Status.NOT_FOUND,
      message: 'User not found'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  verifyEmailController,
  tryAgainVerifyEmailController
}
