const { body } = require('express-validator')
const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 8, max: 64 })
    .withMessage('Password must be between 8 and 64 characters.')
    .matches(/[a-zA-Z]/)
    .withMessage('Password must contain at least one letter.')
    .matches(/\d/)
    .withMessage('Password must contain at least one number.')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('Password must contain at least one special character.')
]

module.exports = loginValidation