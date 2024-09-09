const { param } = require('express-validator')
const usernameValidation = [
  param('username')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be betweem 3 amd 50 characters.')
    .notEmpty()
    .withMessage('Username required.')

]
module.exports = usernameValidation