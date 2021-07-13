const express = require('express')
const router = express.Router()

const { acyncWrapper } = require('../../helpers/errorHandler')
const { authMiddleware } = require('../../middlewears/authMiddleware')
const {
  registrationController,
  loginController,
  logoutController,
  updateAvatarController,
  getCurrentUserController
} = require('../../controllers/authController')
const upload = require('../../helpers/multer')
router.post('/registration', acyncWrapper(registrationController))
router.post('/login', acyncWrapper(loginController))
router.post('/logout', authMiddleware, acyncWrapper(logoutController))
router.patch(
  '/avatar',
  authMiddleware,
  upload.single('avatar'),
  acyncWrapper(updateAvatarController)
)

router.get('/current', authMiddleware, acyncWrapper(getCurrentUserController))

module.exports = { authRouter: router }
