const express = require('express')
const router = express.Router()

const {
  postContactsValidation,
  putContactsValidation,
  patchContactsValidation
} = require('../../middlewears/contactsValidation')

const modelsMiddleweare = require('../../middlewears/models')

const {
  getContacts,
  getContactById
  // addContact,
  // changeContact,
  // deleteContact
} = require('../../controllers/contactsController')

router.use(modelsMiddleweare)
router.get('/', getContacts)
router.get('/:contactId', getContactById)
// router.post('/', postContactsValidation, addContact)
// router.delete('/:contactId', removeContact)
// router.put('/:contactId', putContactsValidation, updateContact)
// router.patch('/:contactId', patchContactsValidation, updateContact)

module.exports = router
