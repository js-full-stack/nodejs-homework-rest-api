const Joi = require('joi')
const { CustomErr } = require('../helpers/errors')
module.exports = {
  postContactsValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string()
        .min(5)
        .max(50)
        .email({
          minDomainSegments: 2
        })
        .required(),
      phone: Joi.string()
        .pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){8,14}(\s*)?$/)
        .required(),
      favorite: Joi.boolean().optional()
    })

    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      next(
        new CustomErr(
          validationResult.error.details[0].message.replace(/"/g, '')
        )
      )
    }

    next()
  },

  patchContactsValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(2).max(30).optional(),
      email: Joi.string()
        .min(5)
        .max(50)
        .email({
          minDomainSegments: 2
        })
        .optional(),
      phone: Joi.string()
        .pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)
        .min(5)
        .max(50)
        .optional(),
      favorite: Joi.boolean().optional()
    })

    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      next(
        new CustomErr(
          validationResult.error.details[0].message.replace(/"/g, '')
        )
      )
    }

    next()
  },

  patchStatusValidation: (req, res, next) => {
    const schema = Joi.object({
      favorite: Joi.boolean().required()
    })

    const validationResult = schema.validate(req.body)
    if (validationResult.error) {
      next(
        new CustomErr(
          validationResult.error.details[0].message.replace(/"/g, '')
        )
      )
    }

    next()
  }
}
