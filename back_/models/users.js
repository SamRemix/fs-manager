const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  // add 'createdAt' & 'updatedAt' properties to schema
  timestamps: true
})

module.exports = model('User', userSchema)