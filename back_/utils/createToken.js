const { sign } = require('jsonwebtoken')

const createToken = _id => (
  // return connection id based on user id and secret key
  sign({ _id }, process.env.SECRET)
)

module.exports = createToken