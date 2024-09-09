const { body } = require('express-validator')

const createVenueValidations = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long.')
    .isString().withMessage('Name must be a string.')
    .trim(),

  body('location')
    .notEmpty().withMessage('Location is required')
    .isIn(['city_center','suburbs','downtown']).withMessage('Invalid location. Allowed values are city_center, suburbs, downtown.'),

  body('capacity')
    .isInt().withMessage('Capacity must be a positive number')
    .notEmpty().withMessage('Capacity cannot be empty'),

  body('description')
    .optional()
    .isLength({ min: 10 }).withMessage('Description must be at least 10 characters long')
    .isString().withMessage('Description must be a string')
    .trim()
]

module.exports = createVenueValidations