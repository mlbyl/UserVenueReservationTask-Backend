const reservationServices = require('../services/reservationServices')
const { validationResult } = require('express-validator')
const { ErrorResponse, SuccesResponse } = require('../utils/errorHandler')
const Venue = require('../models/venue')

const createReservation = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send(new ErrorResponse(errors.array().map(err => err.msg).join(', ')))
  }
  const adminId = req.user.id
  const { venueId, date, time, numberOfPeople } = req.body
  try {
    const venue = await Venue.findByPk(venueId);
    if (!venue) {
      throw new ErrorResponse('The selected venue is unavailable or does not exist. Please choose another venue from the list.', 404);
    }
    const newVenue = await reservationServices.createReservation(adminId, venueId, date, time, numberOfPeople)
    return res.status(201).send(new SuccesResponse(newVenue.message, newVenue.data))
  } catch (error) {
    return res.status(error.statusCode).send(new ErrorResponse(error.message))
  }
}
const getAllReservations = async (req, res) => {
  try {
    const allReservations = await reservationServices.getAllReservations()
    res.status(200).send(new SuccesResponse(allReservations.message, allReservations.data))
  } catch (error) {
    return res.status(error.statusCode).send(new ErrorResponse(error.message))
  }
}

const getOneReservation = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send(new ErrorResponse(errors.array()))
  }
  const userId = req.user.id
  const id = req.params.id
  try {
    const reservation = await reservationServices.getOneReservation(userId, id)
    return res.status(200).send(new SuccesResponse(reservation.message, reservation.data))
  } catch (error) {
    return res.status(error.statusCode).send(new ErrorResponse(error.message))
  }
}
const deleteReservation = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new ErrorResponse(errors.array())
  }
  const userId = req.user.id
  const { id } = req.params
  try {
    const deletedReservation = await reservationServices.deleteReservation(userId, id)
    return res.status(200).send(new SuccesResponse(deletedReservation.message, deletedReservation.data))
  } catch (error) {
    return res.status(error.statusCode).send(new ErrorResponse(error.message))
  }
}

module.exports = { createReservation, getAllReservations, getOneReservation, deleteReservation }