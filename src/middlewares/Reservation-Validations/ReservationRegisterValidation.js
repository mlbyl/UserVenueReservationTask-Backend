const { body } = require('express-validator')
const moment = require('moment')
const { ErrorResponse } = require('../../utils/errorHandler')

const createReservationValidator = [
  body('venueId')
    .isInt().withMessage('VenueId must be a positive number'),

  body('date')
    .isDate({ format: 'YYYY-MM-DD' }).withMessage('Date must be in YYYY-MM-DD format.')
    .isAfter(new Date().toISOString().split('T')[0]).withMessage('Date cannot be in the past'),

  body('time')
    .custom(value => {
      const time = moment(value, 'HH:mm', true)
      const startTime = moment('09:00', 'HH:mm')
      const endTime = moment('22:00', 'HH:mm')
      if (!time.isValid()) {
        throw new ErrorResponse('Time must be in HH:mm format.')
      }
      if (time.isBefore(startTime) || time.isAfter(endTime)) {
        throw new ErrorResponse('Time must be within business hours (09:00 to 22:00)')
      }
      return true
    }).withMessage('Invalid time provided'),

  body('numberOfPeople')
    .isInt().withMessage('Number of People must be a positive number')
]
module.exports = createReservationValidator