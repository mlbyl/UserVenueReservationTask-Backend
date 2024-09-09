const { DataTypes } = require('sequelize')
const sequelize = require('../../config/connection')

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user'
  }

}, {
  timestamps: true, hooks: {
    beforeValidate: (user) => {
      if (!user.role || user.role.trim() === '' || !['admin', 'user'].includes(user.role)) {
        user.role = 'user'
      }
    }
  }

})

module.exports = User