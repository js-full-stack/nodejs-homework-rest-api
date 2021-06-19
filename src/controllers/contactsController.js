const ObjectId = require('mongodb').ObjectID

const { connectMongo } = require('../db/connection')
const getContacts = async (req, res) => {
  const contacts = await req.db.Contacts.find({}).toArray()
  res.json({ contacts })
}

const getContactById = async (req, res) => {
  const { contactId } = req.params
  const contact = await req.db.Contacts.findOne({
    _id: new ObjectId(contactId)
  })

  if (!contact) {
    return res.status(400).json({
      status: `failure, no contact with id '${contactId}' found!`
    })
  }

  res.json({ contact, status: 'success' })
}

const addContact = async (req, res) => {
  const { name, email, phone } = req.body

  await req.db.Contacts.insert({ name, email, phone })

  res.json({ status: 'success' })
}

const changeContact = async (req, res) => {
  const { name, email, phone } = req.body

  await req.db.Contacts.updateOne(
    { _id: new ObjectId(req.params.contactId) },
    { $set: { name, email, phone } }
  )

  res.json({ status: 'success' })
}

const deleteContact = async (req, res) => {
  await req.db.Contacts.deleteOne({ _id: new ObjectId(req.params.contactId) })
  res.json({ status: 'success' })
}

module.exports = {
  getContacts,
  getContactById,
  addContact,
  changeContact,
  deleteContact
}
