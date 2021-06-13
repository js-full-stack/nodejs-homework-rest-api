const express = require('express')
const router = express.Router()
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  // updateContact,
  putContact
} = require('../../model/index')

router.get('/', listContacts)
router.get('/:contactId', getContactById)
router.post('/', addContact)
router.delete('/:contactId', removeContact)
// // router.patch('/:contactId', updateContact)
router.put('/:contactId', putContact)

module.exports = router
