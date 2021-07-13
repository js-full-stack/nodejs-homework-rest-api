const express = require('express')
const router = express.Router()

const {
  postContactsValidation,
  putContactsValidation
  // patchContactsValidation
} = require('../../middlewears/contactsValidation')

const modelsMiddleweare = require('../../middlewears/models')
const { errorHandler } = require('../../helpers/errorHandler')

const {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  changeContact
} = require('../../controllers/contactsController')

router.use(modelsMiddleweare)
router.get('/', errorHandler(getContacts))
router.get('/:contactId', errorHandler(getContactById))
router.post('/', postContactsValidation, errorHandler(addContact))
router.delete('/:contactId', errorHandler(deleteContact))
router.put('/:contactId', putContactsValidation, errorHandler(changeContact))
// router.patch('/:contactId', patchContactsValidation, changeContact)

module.exports = router
