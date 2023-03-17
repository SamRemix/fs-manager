const User = require('../models/users')

const createToken = require('../utils/createToken')

const signup = async (req, res) => {
  // retrieve data sent from the front-end application
  const { name, email, password } = req.body

  try {
    // register user
    const user = await User.signup(name, email, password)

    // returns a token to create and keep the connection (like a session)
    res.status(200).json(createToken(user._id))
  } catch ({ message }) {
    res.status(400).json({ error: message })
  }
}

const login = async (req, res) => {
  // retrieve data sent from the front-end application
  const { email, password } = req.body

  try {
    // login user
    const user = await User.login(email, password)

    // returns a token to create and keep the connection (like a session)
    res.status(200).json(createToken(user._id))
  } catch ({ message }) {
    res.status(400).json({ error: message })
  }
}

module.exports = { signup, login }