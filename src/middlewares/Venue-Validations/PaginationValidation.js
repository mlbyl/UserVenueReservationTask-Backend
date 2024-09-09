const { query } = require('express-validator')

const paginationValidator = [
  query('page')
    .optional()
    .isInt({min:1}).withMessage('Page must be a positive number')
    .toInt(),

  query('limit')
    .optional()
    .isInt({min:1}).withMessage('Limit must be a positive number ')
    .toInt(),

  query('location')
    .optional()
    .isString().withMessage('Location must be a string')
    .trim()
    .isIn(['city_center', 'suburbs', 'downtow']).withMessage('Invalid location specified')
]
module.exports = paginationValidator