const express = require('express')
const router = express.Router()

const {
  postContactsValidation
  putContactsValidation,
  patchContactsValidation
} = require('../../middlewears/contactsValidation')

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact
} = require('../../model/index')

router.get('/', listContacts)
router.get('/:contactId', getContactById)
router.post('/', postContactsValidation, addContact)
router.delete('/:contactId', removeContact)
router.put('/:contactId', putContactsValidation, updateContact)
router.patch('/:contactId', patchContactsValidation, updateContact)

module.exports = router
