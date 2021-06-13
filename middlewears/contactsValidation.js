const Joi = require('joi')

module.exports = {
  postContactsValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().alphanum().min(5).max(50).required(),
      phone: Joi.string().alphanum().min(5).max(50).required()
    })

    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      return res.status(400).json({
        status: 400,
        message: 'fields name, mail and phone are required!',
        details: validationResult.error.details[0].message.replace(/"/g, '')
      })
    }

    next()
  },

  putContactsValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().alphanum().min(5).max(50).required(),
      phone: Joi.string().alphanum().min(5).max(50).required()
    })

    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      return res.status(400).json({
        status: 400,
        message: 'fields name, mail and phone are required!',
        details: validationResult.error.details[0].message.replace(/"/g, '')
      })
    }

    next()
  },
  patchContactsValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).optional(),
      email: Joi.string().alphanum().min(5).max(50).optional(),
      phone: Joi.string().alphanum().min(5).max(50).optional()
    })

    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      return res.status(400).json({
        status: 400,
        message: 'invalid data',
        details: validationResult.error.details[0].message.replace(/"/g, '')
      })
    }

    next()
  }
}

// message: ${message.replace(/"/g, '')},
