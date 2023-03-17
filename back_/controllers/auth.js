const { signup, login } = require('../models/users')

const createToken = require('../utils/createToken')

const signUp = async (req, res) => {
  const { name, email, password } = req.body

  try {
    // register user with statics from user model
    const user = await signup(name, email, password)

    // return token & user data
    res.status(200).json({ token: createToken(user._id), user })
  } catch ({ message }) {
    res.status(400).json({ error: message })
  }
}

const logIn = async (req, res) => {
  const { email, password } = req.body

  try {
    // login user with statics from user model
    const user = await login(email, password)

    // return token & user data
    res.status(200).json({ token: createToken(user._id), user })
  } catch ({ message }) {
    res.status(400).json({ error: message })
  }
}

module.exports = { signUp, logIn }