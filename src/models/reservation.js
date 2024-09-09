const { DataTypes } = require('sequelize')
const sequelize = require('../../config/connection')
const User = require('./user')
const Venue = require('./venue')

const Reservation = sequelize.define('Reservation', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  venueId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Venue,
      key: 'id'
    },
    onDelete:'CASCADE'
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  numberOfPeople: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, { timestamps: true })

User.hasMany(Reservation, { foreignKey: 'userId' })
Venue.hasMany(Reservation, { foreignKey: 'venueId' })
Reservation.belongsTo(User, { foreignKey: 'userId' })
Reservation.belongsTo(Venue, { foreignKey: 'venueId' })

module.exports = Reservation