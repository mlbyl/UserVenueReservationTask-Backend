const venueService = require('../services/venueServices')
const { validationResult } = require('express-validator')
const { ErrorResponse, SuccesResponse } = require('../utils/errorHandler')

const createVenue = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send(new ErrorResponse(errors.array()))
  }
  const adminId = req.user.id;
  const { name, location, capacity, description } = req.body
  try {
    const newVenue = await venueService.createVenue(adminId, name, location, capacity, description)
    res.status(201).send(new SuccesResponse(newVenue.message, newVenue.data))
  } catch (error) {
    return res.status(error.statusCode).send(new ErrorResponse(error.message))
  }
}
const getAllVenues = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send(new ErrorResponse(errors.array()))
  }
  const { limit, page, location } = req.query
  try {
    const allVenues = await venueService.getAllVenues(page, limit, location)
    res.status(200).send(new SuccesResponse(allVenues.message, allVenues.data))
  } catch (error) {
    res.status(error.statusCode).send(new ErrorResponse(error.message))
  }
}
const getVenueById = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send(new ErrorResponse(errors.array()))
  }
  const { id } = req.params
  try {
    const venue = await venueService.getVenueById(id)
    return res.status(200).send(new SuccesResponse(venue.message, venue.data))
  } catch (error) {
    return res.status(error.statusCode).send(new ErrorResponse(error.message))
  }
}
const updateVenue = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send(new ErrorResponse(errors.array()))
  }
  const adminId = req.user.id
  const { id } = req.params
  const { name, location, capacity, description } = req.body
  try {
    const updatedVenue = await venueService.updateVenue(adminId, id, name, location, capacity, description)
    return res.status(200).send(new SuccesResponse(updatedVenue.message, updatedVenue.data))
  } catch (error) {
    return res.status(error.statusCode).send(new ErrorResponse(error.message))
  }
}
const deleteVenue = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new ErrorResponse(errors.array())
  }
  const adminId = req.user.id
  const { id } = req.params
  try {
    const deletedVenue = await venueService.deleteVenue(adminId, id)
    console.log(deletedVenue)
    return res.status(200).send(new SuccesResponse(deletedVenue.message, deletedVenue.data))
  } catch (error) {
    return res.status(error.statusCode).send(new ErrorResponse(error.message))
  }
}
module.exports = { createVenue, getAllVenues, getVenueById, updateVenue, deleteVenue }