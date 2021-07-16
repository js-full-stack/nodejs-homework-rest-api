const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const { v4 } = require('uuid')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  token: {
    type: String,
    default: null
  },
  verify: {
    type: Boolean,
    default: false
  },
  verifyTokenEmail: {
    type: String,
    required: [true, 'Verify token is required'],
    default: v4()
  },
  avatarURL: {
    type: String,
    default: function () {
      return gravatar.url(this.email, { s: '250' }, true)
    }
  }
})

userSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})
const User = mongoose.model('user', userSchema)

module.exports = { User }
