const User = require('../models/users')
const { verify } = require('jsonwebtoken')

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' })
  }

  // remove 'Bearer ' from the token string
  const token = authorization.split(' ')[1]

  try {
    const { _id } = verify(token, process.env.SECRET)

    // create req.user object
    req.user = await User.findOne({ _id }).select('_id')

    next()
  } catch (error) {
    return res.status(401).json({ error: 'Request isn\'t authorized' })
  }
}

module.exports = requireAuth