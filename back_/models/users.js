const { Schema, model } = require('mongoose')
const { genSalt, hash, compare } = require('bcrypt')
const { isEmail, isStrongPassword } = require('validator')

const userSchema = new Schema({
  name: {
    type: String,
    required: true
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

userSchema.statics.login = async function (email, password) {
  // check if params are not empty
  const isEmptyParam = !email && 'Email' || !password && 'Password'

  if (isEmptyParam) {
    throw Error(`${isEmptyParam} cannot be empty`)
  }

  // check if email matches a user
  const user = await this.findOne({ email })

  if (!user) {
    throw Error('Incorrect email')
  }

  // compare input password with hashed password from db
  const match = await compare(password, user.password)

  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = model('User', userSchema)