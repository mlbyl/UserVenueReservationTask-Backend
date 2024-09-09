const { param } = require('express-validator')


const idValidator = [
  param('id')
    .isInt().withMessage('Id must be a positive number')
]
module.exports = idValidator