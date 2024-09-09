const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/userControllers')
const userRegisterValidationMiddleware = require('../middlewares/User-Validations/UserRegisterValidation')
const usernameValidation = require('../middlewares/User-Validations/UsernameValidation')
const loginValidation = require('../middlewares/User-Validations/LoginValidation')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', authMiddleware, userControllers.findAllUsers)
router.get('/:username', usernameValidation, authMiddleware, userControllers.findUserByUsername)
router.post('/register', userRegisterValidationMiddleware, userControllers.registerUser)
router.post('/login', loginValidation, userControllers.loginUser)


module.exports = router