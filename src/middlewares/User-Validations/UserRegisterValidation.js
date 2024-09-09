const { body, param } = require('express-validator')
const validateRegister = [

  //Username field
  body("username")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be between 3 and 50 characters.')
    .notEmpty()
    .withMessage('Username is required.'),

  //Email field
  body("email")
    .isEmail()
    .withMessage('Please enter a valid email.')
    .normalizeEmail(),

  //password
  body("password")
    .isLength({ min: 8, max: 64 })
    .withMessage('Password must be between 8 and 64 characters.')
    .matches(/[a-zA-Z]/)
    .withMessage('Password must contain at least one letter.')
    .matches(/\d/)
    .withMessage('Password must contain at least one number.')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('Password must contain at least one special character.')
    .notEmpty().withMessage('Password required.'),

]


module.exports = validateRegister