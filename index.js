const express = require('express')
const app = express()
const synchModels = require('./config/syncDbModels')
const userRouter = require('./src/routes/userRoutes')
const venueRouter = require('./src/routes/venueRoutes')
const reservationRouter = require('./src/routes/reservation')

require('dotenv').config()
const PORT = process.env.Port

synchModels();// 



app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', userRouter)
app.use('/api/venues', venueRouter)
app.use('/api/reservations', reservationRouter)

app.listen(PORT, () => {
  console.log(`App listening on port : ${PORT}`)
})
module.exports = app