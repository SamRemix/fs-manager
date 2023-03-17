require('dotenv').config()
const { PORT, MONGO_URI } = process.env

const express = require('express')
const { connect } = require('mongoose')

const app = express()

app.use(express.json())

const dbConnection = async () => {
  try {
    await connect(MONGO_URI)

    console.log('Connected to database')
  } catch (error) {
    console.log(error)
  }
}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)

  dbConnection()
})