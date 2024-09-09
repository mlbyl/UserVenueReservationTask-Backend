const express = require('express')
const router = express.Router()
const venueControllers = require('../controllers/venueController')
const createVenueValidator = require('../middlewares/Venue-Validations/CreateVenueValidations')
const venueIdValidator = require('../middlewares/Venue-Validations/VenueIdValidation')
const authMiddleware = require('../middlewares/authMiddleware')
const updateVenueValidations = require('../middlewares/Venue-Validations/UpdateVenueValidation')
const paginationValidator = require('../middlewares/Venue-Validations/PaginationValidation')

router.get('/', authMiddleware, paginationValidator, venueControllers.getAllVenues)
router.get('/:id', authMiddleware, venueIdValidator, venueControllers.getVenueById)
router.post('/', authMiddleware, createVenueValidator, venueControllers.createVenue)
router.put('/:id', authMiddleware, updateVenueValidations, venueControllers.updateVenue)
router.delete('/:id', authMiddleware, venueIdValidator, venueControllers.deleteVenue)


module.exports = router