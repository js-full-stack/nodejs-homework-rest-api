const express = require('express')
const router = express.Router()

const { acyncWrapper } = require('../../helpers/errorHandler')
const { authMiddleware } = require('../../middlewears/authMiddleware')
const {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController
} = require('../../controllers/authController')

router.post('/registration', acyncWrapper(registrationController))
router.post('/login', acyncWrapper(loginController))
router.post('/logout', authMiddleware, acyncWrapper(logoutController))
router.get('/current', authMiddleware, acyncWrapper(getCurrentUserController))

module.exports = { authRouter: router }
