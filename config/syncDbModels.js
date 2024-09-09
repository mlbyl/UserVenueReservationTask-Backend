const sequelize = require('./connection')

async function syncModels() {
  try {
    await sequelize.sync({logging:false});
    console.log('Database and Models have been successfully synchronized')
  } catch (error) {
    console.error('Database synchronization error', error)
  }
}
module.exports = syncModels
