const express = require('express')
const router = express.Router()

const {
  postContactsValidation,
  patchContactsValidation,
  patchStatusValidation
} = require('../../middlewears/contactsValidation')

const { acyncWrapper } = require('../../helpers/errorHandler')

const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  changeContactController
} = require('../../controllers/contactsController')

const { authMiddleware } = require('../../middlewears/authMiddleware')

router.use(authMiddleware)

router.get('/', acyncWrapper(getContactsController))
router.get('/:contactId', acyncWrapper(getContactByIdController))
router.post('/', postContactsValidation, acyncWrapper(addContactController))
router.delete('/:contactId', acyncWrapper(deleteContactController))
router.put(
  '/:contactId',
  postContactsValidation,
  acyncWrapper(changeContactController)
)
router.patch(
  '/:contactId',
  patchContactsValidation,
  acyncWrapper(changeContactController)
)
router.patch(
  '/:contactId/favorite',
  patchStatusValidation,
  acyncWrapper(changeContactController)
)

module.exports = router
