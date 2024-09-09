const { DataTypes } = require('sequelize')
const sequelize = require('../../config/connection')
const User = require('../models/user')

const Venue = sequelize.define('Venue', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['name', 'location'],
    }
  ]
})


User.hasMany(Venue, { foreignKey: 'createdBy' })
Venue.belongsTo(User, { foreignKey: 'createdBy' })


module.exports = Venue
