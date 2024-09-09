const User = require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { ErrorResponse, SuccesResponse } = require("../utils/errorHandler")

const registerUser = async (username, email, password, role) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  try {
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role
    })
    // const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '15m' })
    //Exclude the password from the response
    const { password: _, ...userWithoutPassword } = newUser.toJSON()
    return new SuccesResponse('User registered succesfully.', userWithoutPassword)
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new ErrorResponse('Email already exists.', 400)
    }
    throw new ErrorResponse(error.message, error.statusCode || 500)
  }
}


const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } })
    return new SuccesResponse('User founded succesfully.', user)
  } catch (error) {
    throw new ErrorResponse(error.message)
  }
}


const findUserByUsername = async (username) => {
  try {
    const user = await User.findOne({ where: { username }, attributes: { exclude: 'password' } })
    return new SuccesResponse('User founded succesfully.', user)
  } catch (error) {
    throw new ErrorResponse(error.message)
  }
}

const findAllUsers = async () => {
  try {
    const allUsers = await User.findAll({ attributes: { exclude: 'password' } })
    if (allUsers.length === 0) {
      throw new ErrorResponse('No users found', 404)
    }
    return new SuccesResponse('Users founded succesfully.', allUsers)
  } catch (error) {
    throw new ErrorResponse(error.message, error.statusCode || 500)
  }
}

const loginUser = async (email, password) => {
  try {
    const { data } = await findUserByEmail(email)
    if (!data) {
      throw new ErrorResponse('User not found', 404)
    }
    const isPasswordValid = await bcrypt.compare(password, data.password)
    if (!isPasswordValid) {
      throw new ErrorResponse('Incorrect Password', 400)
    }
    const token = jwt.sign({ id: data.id, email: data.email }, process.env.JWT_SECRET, { expiresIn: '1h' })
    const { password: _, ...userWithoutPassword } = data.dataValues
    return new SuccesResponse('Token provided succesfully.', { data: userWithoutPassword, token })
  } catch (error) {
    throw new ErrorResponse(error.message, error.statusCode || 500)
  }
}
module.exports = { registerUser, findUserByUsername, loginUser, findAllUsers }