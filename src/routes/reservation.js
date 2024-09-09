const express = require('express')
const router = express.Router()
const reservationController = require('../controllers/reservationControllers')
const idValidator = require('../middlewares/Reservation-Validations/ReservationGetByIdValidations')
const createReservationValidator = require('../middlewares/Reservation-Validations/ReservationRegisterValidation')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', authMiddleware, reservationController.getAllReservations)
router.get('/:id', authMiddleware, idValidator, reservationController.getOneReservation)
router.post('/', authMiddleware, createReservationValidator, reservationController.createReservation)
router.delete('/:id', authMiddleware, idValidator, reservationController.deleteReservation)

module.exports = router