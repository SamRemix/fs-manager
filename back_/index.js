require('dotenv').config()
const { PORT, MONGO_URI } = process.env

const express = require('express')
const { connect } = require('mongoose')

const authRoutes = require('./routes/auth')
const usersRoutes = require('./routes/users')

const logRequest = require('./middlewares/logRequest')

const app = express()

app.use(express.json())

// middleware that log date, path & method at each request in the console
app.use(logRequest)

app.use('/auth', authRoutes)
app.use('/users', usersRoutes)

const dbConnection = async () => {
  try {
    await connect(MONGO_URI)

    console.log('Connected to database')
  } catch (error) {
    console.log(error)
  }
}

// start server & then connect to db
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)

  dbConnection()
})