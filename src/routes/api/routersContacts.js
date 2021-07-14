const express = require('express')
const router = express.Router()

const {
  postContactsValidation,
  patchContactsValidation,
  patchStatusValidation
} = require('../../middlewears/contactsValidation')

const { asyncWrapper } = require('../../helpers/errorHandler')

const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  changeContactController
} = require('../../controllers/contactsController')

const { authMiddleware } = require('../../middlewears/authMiddleware')

router.use(authMiddleware)

router.get('/', asyncWrapper(getContactsController))
router.get('/:contactId', asyncWrapper(getContactByIdController))
router.post('/', postContactsValidation, asyncWrapper(addContactController))
router.delete('/:contactId', asyncWrapper(deleteContactController))
router.put(
  '/:contactId',
  postContactsValidation,
  asyncWrapper(changeContactController)
)
router.patch(
  '/:contactId',
  patchContactsValidation,
  asyncWrapper(changeContactController)
)
router.patch(
  '/:contactId/favorite',
  patchStatusValidation,
  asyncWrapper(changeContactController)
)

module.exports = { contactsRouter: router }
