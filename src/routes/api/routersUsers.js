const express = require('express')
const router = express.Router()
const { avatarStorage } = require('../../helpers/constants')
// const fs = require('fs/promises')
// const path = require('path')
const uploadMiddleware = require('../../middlewears/uploadMiddleware')

const { asyncWrapper } = require('../../helpers/errorHandler')
const { authMiddleware } = require('../../middlewears/authMiddleware')
const {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController
} = require('../../controllers/authController')
const avatarUploadHandler = require('../../helpers/avatarUploadHandler')
router.post('/registration', asyncWrapper(registrationController))
router.post('/login', asyncWrapper(loginController))
router.post('/logout', authMiddleware, asyncWrapper(logoutController))
router.get('/current', authMiddleware, asyncWrapper(getCurrentUserController))

router.post(
  '/upload',
  uploadMiddleware.single('avatar'),
  asyncWrapper(avatarUploadHandler)
)

router.use(express.static(avatarStorage.PERMANENT))

router.patch(
  '/avatar',
  authMiddleware,
  uploadMiddleware.single('avatar'),
  asyncWrapper(avatarUploadHandler)
)

module.exports = { usersRouter: router }
