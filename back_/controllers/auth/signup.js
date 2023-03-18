const User = require('../../models/users')

const createToken = require('../../utils/createToken')

const signup = async (req, res) => {
  const { name, email, password } = req.body

  try {
    // register user with statics from user model
    const user = await User.signup(name, email, password)

    // return token & user data
    res.status(200).json({ token: createToken(user._id), user })
  } catch ({ message }) {
    res.status(400).json({ error: message })
  }
}

module.exports = signup