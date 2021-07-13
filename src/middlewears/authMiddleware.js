const jwt = require('jsonwebtoken')
const { Status } = require('../helpers/constants')
const { CustomErr } = require('../helpers/errors')
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return next(new CustomErr(Status.UNAUTHORIZED, 'Please, provide a token'))
  }
  try {
    const user = jwt.decode(token, process.env.JWT_SECRET)

    req.token = token
    req.user = user

    return next()
  } catch (err) {
    next(new CustomErr(Status.UNAUTHORIZED, 'Please, provide a token'))
  }
}

module.exports = {
  authMiddleware
}
