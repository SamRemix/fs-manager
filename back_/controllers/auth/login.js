const User = require('../../models/users')

const createToken = require('../../utils/createToken')

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    // login user with statics from user model
    const user = await User.login(email, password)

    // return token & user data
    res.status(200).json({ token: createToken(user._id), user })
  } catch ({ message }) {
    res.status(400).json({ error: message })
  }
}

module.exports = login