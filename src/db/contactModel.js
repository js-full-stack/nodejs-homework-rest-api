const mongoose = require('mongoose')

const contactShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact']
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'users'
  },
  favorite: {
    type: Boolean,
    default: false
  }
})

const Contact = mongoose.model('contact', contactShema)

module.exports = { Contact }
