const User = require('../../models/users')
const { compare } = require('bcrypt')

const createToken = require('../../utils/createToken')

const login = async ({ body }, res) => {
  const { email, password } = body

  // check if params are not empty
  const isEmptyParam = !email && 'Email' || !password && 'Password'

  if (isEmptyParam) {
    return res.status(400).json({ error: `'${isEmptyParam}' field cannot be empty` })
  }

  // check if email matches a user
  const user = await User.findOne({ email })

  if (!user) {
    return res.status(400).json({ error: 'Incorrect email' })
  }

  // compare input password with hashed password from db
  const match = await compare(password, user.password)

  if (!match) {
    return res.status(400).json({ error: 'Incorrect password' })
  }

  // return token & user data
  res.status(200).json({ token: createToken(user._id), user })
}

module.exports = login