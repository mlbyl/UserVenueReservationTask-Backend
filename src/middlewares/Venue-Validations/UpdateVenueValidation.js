const { param, body } = require('express-validator')

const updateVenueValidations = [
  param('id')
    .isInt().withMessage('Id must be a positive number')
    .toInt(),

  body('name')
    .optional()
    .isString().withMessage('Name must be a string.')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long')
    .trim(),

  body('location')
    .optional()
    .isIn(['city_center', 'suburbs', 'downtown']).withMessage('Invalid location. Allowed values are city_center, suburbs, downtown.'),

  body('capacity')
    .optional()
    .notEmpty().withMessage('Capacity cannot be empty')
    .isInt().withMessage('Capacity must be a positive number'),

  body('description')
    .optional()
    .isLength({ min: 10 }).withMessage('Description must be at least 10 characters long')
    .isString().withMessage('Description must be a string')
    .trim()
]

module.exports = updateVenueValidations