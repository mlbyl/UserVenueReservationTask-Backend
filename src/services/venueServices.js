const Venue = require('../models/venue')
const User = require('../models/user')
const { ErrorResponse, SuccesResponse } = require('../utils/errorHandler')

const createVenue = async (adminId, name, location, capacity, description) => {
  const checkUserRole = await User.findByPk(adminId)
  if (!checkUserRole) {
    throw new ErrorResponse('Admin user not found', 404)
  }
  if (checkUserRole.role !== 'admin') {
    throw new ErrorResponse('Only admins can perform this action', 403)
  }
  try {
    const newVenue = await Venue.create({
      name,
      location,
      capacity,
      description,
      createdBy: adminId
    })
    return new SuccesResponse('Venue created succesfully.', newVenue)
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new ErrorResponse('A venue with the same name and location already exists.', 400);
    }
    throw new ErrorResponse(error.message, error.statusCode || 500)
  }
}


const getAllVenues = async (page = 1, limit = 10, location) => {
  try {
    const offset = (page - 1) * limit
    const filteredOptions = {}
    if (location) {
      filteredOptions.location = location
    }

    const allVenues = await Venue.findAndCountAll({
      where: filteredOptions,
      limit,
      offset
    })
    if (allVenues.count === 0) {
      throw new ErrorResponse('No venues found', 404)
    }
    const paginationInfo = {
      totalItems: allVenues.count,
      totalPages: Math.ceil(allVenues.count / limit),
      currentPage: page
    }
    return new SuccesResponse('All Venues fetched succesfully', { venues: allVenues.rows, pagination: paginationInfo })
  } catch (error) {
    throw new ErrorResponse(error.message, error.statusCode || 500)
  }
}


const getVenueById = async (id) => {
  try {
    const venue = await Venue.findOne({ where: { id }, attributes: { exclude: 'password' } })
    if (!venue) {
      throw new ErrorResponse('Venue not found.', 404)
    }
    return new SuccesResponse('Venue fetched succesfully.', venue)
  } catch (error) {
    throw new ErrorResponse(error.message, error.statusCode || 500)
  }
}


const updateVenue = async (adminId, id, newName, newLocation, newCapacity, newDescription) => {
  const checkUserRole = await User.findByPk(adminId)
  if (!checkUserRole) {
    throw new ErrorResponse('Admin user not found', 404)
  }
  if (checkUserRole.role !== 'admin') {
    throw new ErrorResponse('Only admins can perform this action', 403)
  }
  const updateableVenue = await getVenueById(id)
  if (!updateableVenue) {
    throw new ErrorResponse('Venue not found.', 404)
  }
  const { name, location, capacity, description } = updateableVenue.data
  const updatedData = {
    name: newName || name,
    location: newLocation || location,
    capacity: newCapacity || capacity,
    description: newDescription || description
  }
  try {
    const [numberOfAffectedRows, updatedVenue] = await Venue.update(updatedData, {
      where: { id },
      returning: true,
      individualHooks: true
    })
    if (numberOfAffectedRows === 0) {
      throw new ErrorResponse('No changes were made to the venue, as the provided data is identical to the existing data.', 400)
    }
    return new SuccesResponse('Venue updated succesfully.', updatedVenue[0])
  } catch (error) {
    throw new ErrorResponse(error.message, error.statusCode || 500)
  }
}
const deleteVenue = async (adminId, id) => {
  const checkUserRole = await User.findByPk(adminId)
  if (!checkUserRole) {
    throw new ErrorResponse('Admin user not found', 404)
  }
  if (checkUserRole.role !== 'admin') {
    throw new ErrorResponse('Only admins can perform this action', 403)
  }
  const deleteableVenue = await getVenueById(id)
  if (!deleteableVenue) {
    throw new ErrorResponse('Venue not found.', 404)
  }
  try {
    const deletedVenue = await Venue.destroy({ where: { id } })
    if (deletedVenue === 0) {
      throw new ErrorResponse('No Venue was deleted.', 400)
    }
    return new SuccesResponse('Venue deleted succesfully', null)
  } catch (error) {
    throw new ErrorResponse(error.message, error.statusCode || 500)
  }
}
module.exports = { createVenue, getAllVenues, getVenueById, updateVenue, deleteVenue }