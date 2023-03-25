const User = require('../../models/users')
const { genSalt, hash } = require('bcrypt')
const { isEmail, isStrongPassword } = require('validator')

const createToken = require('../../utils/createToken')

const signup = async ({ body }, res) => {
  const { name, email, password } = body

  // checks if params are not empty
  const isEmptyParam = !name && 'Name' || !email && 'Email' || !password && 'Password'

  if (isEmptyParam) {
    return res.status(400).json({ error: `'${isEmptyParam}' field cannot be empty` })
  }

  // checks if email already matches a user
  const exists = await User.findOne({ email })

  if (exists) {
    return res.status(400).json({ error: 'Email already in use' })
  }

  // checks if name length is between 3 and 32 characters
  if (name.trim().length < 3) {
    return res.status(400).json({ error: 'Name must contain at least 3 characters' })
  }

  if (name.trim().length > 32) {
    return res.status(400).json({ error: 'Name must not exceed 32 characters' })
  }

  // checks if email is valid
  if (!isEmail(email)) {
    return res.status(400).json({ error: 'Email is not valid' })
  }

  // checks if password is strong enough
  // by default, password must contain at least :
  // 8 characters, 1 lowercase character, 1 uppercase character, 1 number, 1 symbol
  if (!isStrongPassword(password)) {
    return res.status(400).json({ error: 'Password isn\'t strong enough' })
  }

  // if constraints are respected, encrypt the password and create a user
  const salt = await genSalt(10)
  const hashPassword = await hash(password, salt)

  try {
    const user = await User.create({
      name,
      email,
      password: hashPassword
    })

    // returns token
    res.status(200).json(createToken(user._id))
  } catch ({ message }) {
    res.status(400).json({ error: message })
  }
}

module.exports = signup