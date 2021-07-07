/* eslint space-before-function-paren: ["error", "never"] */

const { Contact } = require('../db/contactModel')
const { CustomErr } = require('../helpers/errors')
const { Status } = require('../helpers/constants')
const contactsService = {
  async getContacts(userId, { skip, limit }) {
    const contacts = await Contact.find({ userId })
      .select({ __v: 0 })
      .skip(skip)
      .limit(limit)
    return contacts
  },

  async getContactById(contactId, userId) {
    const contact = await Contact.findOne({ _id: contactId, userId })

    if (!contact) {
      throw new CustomErr(Status.NOT_FOUND, `no contact with id ${contactId}`)
    }

    return contact
  },

  async addContact({ name, email, phone }, userId) {
    const contact = new Contact({ name, email, phone, userId })

    await contact.save()
  },

  async changeContactById(contactId, { name, email, phone }, userId) {
    await Contact.findOneAndUpdate(
      { _id: contactId, userId },
      { $set: { name, email, phone } },
      { new: true }
    )
  },

  async deleteContactById(contactId, userId) {
    await Contact.findOneAndRemove({ _id: contactId, userId })
  }
}

module.exports = {
  contactsService
}
