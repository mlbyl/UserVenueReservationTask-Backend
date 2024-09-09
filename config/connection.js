const { Sequelize } = require('sequelize')
const connectionConfing = require('./config')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,  
  dialect: 'postgres'
});

async function initializeConnection() {
  try {
    sequelize.authenticate()
    console.log('Connection has been established succesfully.')
  } catch (error) {
    console.error('Unable to connect to the database', error)
  }
}
initializeConnection() //Test Connection 
module.exports = sequelize