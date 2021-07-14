const { CustomErr } = require('./errors')
const { Status } = require('./constants')

const asyncWrapper = controller => {
  return (req, res, next) => {
    controller(req, res).catch(next)
  }
}

const errorHandler = (error, req, res, next) => {
  if (error instanceof CustomErr) {
    return res.status(error.status).json({ message: error.message })
  }
  res.status(Status.INTERNAL_SERVER_ERROR).json({ message: error.message })
}

module.exports = { asyncWrapper, errorHandler }
