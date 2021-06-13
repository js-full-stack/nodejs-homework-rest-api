const fs = require('fs/promises')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const contactsPath = path.join(__dirname, './contacts.json')

const getAllContacts = async () => {
  const contactsList = await fs.readFile(contactsPath, 'utf-8')
  const parsedContacts = JSON.parse(contactsList)
  return parsedContacts
}

const listContacts = async (req, res) => {
  try {
    const contacts = await getAllContacts()
    return res.json({ contacts, status: 'success' })
  } catch (error) {
    console.erorr(error)
  }
}

const getContactById = async (req, res) => {
  const { contactId } = req.params
  try {
    const contactsList = await getAllContacts()

    const [contact] = await contactsList.filter(
      contact => contact.id === Number(contactId)
    )
    if (!contact) {
      return res.status(400).json({
        status: `failure, contact with id '${contactId}' not found!`
      })
    }
    return res.json({ contact, status: 'success' })
  } catch (error) {
    console.error(error)
  }
}

const addContact = async (req, res) => {
  const { name, email, phone } = req.body
  try {
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone
    }

    const contactList = await getAllContacts()
    const newContactList = [...contactList, newContact]
    await fs.writeFile(contactsPath, JSON.stringify(newContactList), 'utf-8')
    return res.json({ status: 'success' })
  } catch (error) {
    console.error(error)
  }
}

const removeContact = async (req, res) => {
  try {
    const { contactId } = req.params
    const contactList = getAllContacts()
    const newContactList = contactList.filter(
      contact => contact.id !== contactId
    )
    await fs.writeFile(contactsPath, JSON.stringify(newContactList), 'utf-8')
    return res.json({ status: 'success' })
  } catch (error) {
    console.error(error)
  }
}

const putContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body
    const { contactId } = req.params
    const contactsList = await getAllContacts()
    const changeContact = contactsList.forEach(contact => {
      if (contact.id === Number(contactId)) {
        contact.name = name
        contact.email = email
        contact.phone = phone
      }
    })

    const newContact = [...contactsList, changeContact]
    await fs.writeFile(contactsPath, JSON.stringify(newContact), 'utf-8')
    return res.json({ newContact })
  } catch (error) {
    console.error(error)
  }
}

// const updateContact = async (req, res) => {
//   try {
//     const { contactId } = req.params
//     const { name, email, phone } = req.body

//     const contactList = await getAllContacts()
//     const updData = contactList.forEach(contact => {
//       if (Number(contact.id) === Number(contactId)) {
//         if (name) {
//           contact.name = name
//           fs.writeFile(contactsPath, JSON.stringify(name), 'utf-8')
//         }
//         if (email) {
//           contact.email = email
//         }
//         if (phone) {
//           contact.phone = phone
//         }
//       }
//     })

//     fs.writeFile(contactsPath, JSON.stringify(updData), 'utf-8')
//     return res.json({ status: 'success' })
//   } catch (error) {
//     console.error(error)
//   }
// }

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  // updateContact,
  putContact
}
