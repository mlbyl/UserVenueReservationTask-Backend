const userServices = require('../services/userServices')
const { validationResult } = require('express-validator')
const { ErrorResponse, SuccesResponse } = require('../utils/errorHandler')



const registerUser = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send(new ErrorResponse(errors.array()))
  }
  const { username, email, password, role } = req.body;
  try {
    const newUser = await userServices.registerUser(username, email, password, role)
    return res.status(201).send(new SuccesResponse(newUser.message, newUser.data))

  } catch (error) {
    return res.status(error.statusCode).send(new ErrorResponse(error.message))
  }
}



const findUserByUsername = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send(new ErrorResponse(errors.array()))
  }
  const username = req.params.username
  try {
    const user = await userServices.findUserByUsername(username)
    return res.status(200).send(new SuccesResponse(user.message, user.data))
  } catch (error) {
    return res.status(error.statusCode).send(new ErrorResponse(error.message))
  }
}

const findAllUsers = async (req, res) => {
  try {
    const allUsers = await userServices.findAllUsers()
    return res.status(200).send(new SuccesResponse(allUsers.message, allUsers.data))
  } catch (error) {
    console.log(error)
    return res.status(error.statusCode).send(new ErrorResponse(error.message))
  }
}
const loginUser = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send(new ErrorResponse(errors.array()))
  }
  const { email, password } = req.body
  try {
    const userData = await userServices.loginUser(email, password)
    const { data, token } = userData.data
    return res.status(200).send(new SuccesResponse('User loginned Succesfully.', { user: data, token }))
  } catch (error) {
    return res.status(error.statusCode).send(new ErrorResponse(error.message))
  }
}
module.exports = { registerUser, findUserByUsername, findAllUsers, loginUser }