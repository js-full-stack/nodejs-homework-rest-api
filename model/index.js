const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, './contacts.json')

const getAllContacts = async () => {
  const contactsList = await fs.readFile(contactsPath, 'utf-8')
  const parsedContacts = JSON.parse(contactsList)
  return parsedContacts
}

const listContacts = async (_, res, next) => {
  try {
    const contacts = await getAllContacts()
    return res.status(200).json({ contacts, status: 200, message: 'success' })
  } catch (error) {
    next(error)
  }
}

const getContactById = async (req, res, next) => {
  const { contactId } = req.params
  try {
    const contactsList = await getAllContacts()

    const [contact] = await contactsList.filter(
      contact => contact.id === Number(contactId)
    )
    if (!contact) {
      return res.status(404).json({
        status: 404,
        message: `failure, contact with id '${contactId}' not found!`
      })
    }
    return res.status(200).json({ contact, status: 200, message: 'success' })
  } catch (error) {
    next(error)
  }
}

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body
  try {
    const newContact = {
      id: Date.now(),
      name,
      email,
      phone
    }

    const contactList = await getAllContacts()
    const newContactList = [...contactList, newContact]
    await fs.writeFile(contactsPath, JSON.stringify(newContactList), 'utf-8')
    return res.status(201).json({ status: 201, message: 'success' })
  } catch (error) {
    next(error)
  }
}

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contactList = await getAllContacts()
    const newContactList = contactList.filter(
      contact => contact.id !== Number(contactId)
    )
    await fs.writeFile(contactsPath, JSON.stringify(newContactList), 'utf-8')
    return res.status(200).json({ status: 200, message: 'contact deleted' })
  } catch (error) {
    next(error)
  }
}

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const { name, email, phone } = req.body

    const contactsList = await getAllContacts()

    const changeContact = contactsList.forEach(contact => {
      if (contact.id === Number(contactId)) {
        contact.name = name || contact.name
        contact.email = email || contact.email
        contact.phone = phone || contact.phone
      }
    })

    const newContact = changeContact
      ? [...contactsList, ...changeContact]
      : contactsList
    await fs.writeFile(contactsPath, JSON.stringify(newContact), 'utf-8')
    return res.json({ status: 'success' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact
}
