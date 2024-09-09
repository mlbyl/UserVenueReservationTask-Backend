const {  param } = require('express-validator')

const venueIdValidation = [
  param('id')
    .isInt().withMessage('Id must be a positive number.')
    .toInt()
]
module.exports = venueIdValidation