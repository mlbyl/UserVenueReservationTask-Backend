const Reservation = require("../models/reservation")
const User = require("../models/user")
const { SuccesResponse, ErrorResponse } = require("../utils/errorHandler")

const createReservation = async (adminId, venueId, date, time, numberOfPeople) => {

  try {
    const isVenueAvailableExistDateTime = await Reservation.findOne({ where: { venueId, date, time } })
    if (isVenueAvailableExistDateTime) {
      throw new ErrorResponse('Reservation is not available for this Venue at the selected date and time', 409)
    }
    const newReservation = await Reservation.create({
      userId: adminId,
      venueId,
      date,
      time,
      numberOfPeople
    })
    return new SuccesResponse('Reservation created succesfully.', newReservation)
  } catch (error) {
    throw new ErrorResponse(error.message, error.statusCode || 500)
  }
}
const getOneReservation = async (userId, id) => {

  try {
    const reservation = await Reservation.findByPk(id)
    if (!reservation) {
      throw new ErrorResponse('Reservation not found', 404)
    }
    const checkUserRole = await User.findByPk(userId)
    if (!checkUserRole) {
      throw new ErrorResponse('Admin user not found', 404)
    }
    if (checkUserRole.role !== 'admin' && reservation.userId !== userId) {
      throw new ErrorResponse('Unauthorized access to this reservation.', 403)
    }
    return new SuccesResponse('Reservation fetched succesfully.', reservation)
  } catch (error) {
    throw new ErrorResponse(error.message, error.statusCode || 500)
  }
}
const getAllReservations = async () => {
  try {
    const allReservations = await Reservation.findAll()
    if (allReservations.length === 0) {
      throw new ErrorResponse('Reservations not found', 404)
    }
    return new SuccesResponse('All Reservations fetched succesfully.', allReservations)
  } catch (error) {
    throw new ErrorResponse(error.message, error.statusCode || 500)
  }
}
const deleteReservation = async (id, userId) => {
  try {
    const reservation = await Reservation.findByPk(id)
    if (!reservation) {
      throw new ErrorResponse('Reservation not found', 404)
    }
    const checkUserRole = await User.findByPk(userId)
    if (!checkUserRole) {
      throw new ErrorResponse('Admin user not found', 404)
    }
    if (checkUserRole.role !== 'admin' && reservation.userId !== userId) {
      throw new ErrorResponse('Unauthorized access to this reservation.', 403)
    }
    const deletedReservation = await Reservation.destroy({ where: { id } })
    if (deletedReservation === 0) {
      throw new ErrorResponse('No Reservation was deleted.', 400)
    }
    return new SuccesResponse('Reservation deleted succesfully.', null)
  } catch (error) {
    throw new ErrorResponse(error.message, error.statusCode || 500)
  }
}

module.exports = { createReservation, getOneReservation, getAllReservations, deleteReservation }