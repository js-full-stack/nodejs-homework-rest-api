const { Status } = require('../helpers/constants')
const { contactsService } = require('../services/contactsService')

const getContactsController = async (req, res) => {
  const { _id: userId } = req.user
  let { skip = 0, limit = 5 } = req.query
  limit = parseInt(limit) > 10 ? 10 : parseInt(limit)
  skip = parseInt(skip)
  const contacts = await contactsService.getContacts(userId, { skip, limit })
  return res.json({ contacts, skip, limit })
}

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params
  const { _id: userId } = req.user
  const contact = await contactsService.getContactById(contactId, userId)

  return res.status(Status.OK).json({ contact, status: Status.OK })
}

const addContactController = async (req, res) => {
  const { name, email, phone } = req.body
  const { _id: userId } = req.user
  console.log(userId)

  await contactsService.addContact({ name, email, phone }, userId)

  return res.json({
    status: Status.CREATED,
    message: `a contact with a name ${req.body.name} has been added`
  })
}

const changeContactController = async (req, res) => {
  const { name, email, phone } = req.body
  const { contactId } = req.params
  const { _id: userId } = req.user

  await contactsService.changeContactById(
    contactId,
    { name, email, phone },
    userId
  )
  return res.json({ status: Status.OK })
}

const deleteContactController = async (req, res) => {
  const { contactId } = req.params
  const { _id: userId } = req.user

  await contactsService.deleteContactById(contactId, userId)

  return res.json({
    status: Status.OK,
    message: `contact with id ${contactId} was removed`
  })
}

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  changeContactController,
  deleteContactController
}
