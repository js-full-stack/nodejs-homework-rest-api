const express = require('express')
const router = express.Router()
const { avatarStorage } = require('../../helpers/constants')
const uploadMiddleware = require('../../middlewears/uploadMiddleware')

const { asyncWrapper } = require('../../helpers/errorHandler')
const { authMiddleware } = require('../../middlewears/authMiddleware')
const {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController
} = require('../../controllers/authController')

const {
  verifyEmailController,
  tryAgainVerifyEmailController
} = require('../../controllers/emailVerifyController')

const { updateAvatar } = require('../../helpers/avatarUploadHandler')
router.post('/registration', asyncWrapper(registrationController))
router.post('/login', asyncWrapper(loginController))
router.post('/logout', authMiddleware, asyncWrapper(logoutController))
router.get('/current', authMiddleware, asyncWrapper(getCurrentUserController))

router.post(
  '/upload',
  authMiddleware,
  uploadMiddleware.single('avatar'),
  asyncWrapper(updateAvatar)
)

router.use(express.static(avatarStorage.PERMANENT))

router.patch(
  '/avatar',
  authMiddleware,
  uploadMiddleware.single('avatar'),
  asyncWrapper(updateAvatar)
)

router.get('/verify/:verificationToken', verifyEmailController)
router.post('/verify', tryAgainVerifyEmailController)

module.exports = { usersRouter: router }
