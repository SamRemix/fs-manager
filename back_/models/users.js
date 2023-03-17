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

userSchema.statics.signup = async function (name, email, password) {
  // check if params are not empty
  const isEmpty = !name && 'Name' || !email && 'Email' || !password && 'Password'

  if (isEmpty) {
    throw Error(`${isEmpty} cannot be empty`)
  }

  // check if email already matches a user
  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  // check if name length is between 3 and 16 characters
  if (name.trim().length < 3) {
    throw Error('Name must contain at least 3 characters')
  }

  if (name.trim().length > 16) {
    throw Error('Name must not exceed 16 characters')
  }

  // check if email is valid
  if (!isEmail(email)) {
    throw Error('Email is not valid')
  }

  // check if password is strong enough
  // contain at least 8 characters
  // contain at least 1 lowercase character
  // contain at least 1 uppercase character
  // contain at least 1 number
  // contain at least 1 symbol (special character)
  if (!isStrongPassword(password)) {
    throw Error('Password isn\'t strong enough')
  }

  // if the constraints are respected, encrypt the password and create a user
  const salt = await genSalt(10)
  const hashPassword = await hash(password, salt)

  const user = await this.create({
    name,
    email,
    password: hashPassword
  })

  return user
}

userSchema.statics.login = async function (email, password) {
  // check if params are not empty
  const isEmpty = !email && 'Email' || !password && 'Password'

  if (isEmpty) {
    throw Error(`${isEmpty} cannot be empty`)
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