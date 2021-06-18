const mongoose = require('mongoose')

const contactShema = new mongoose.Shema({
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
  }
})

const Contact = mongoose.model('Contact', contactShema)

module.exports = {
  Contact
}
