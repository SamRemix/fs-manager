const User = require('../../models/users')

const getAll = async (req, res) => {
  const users = await User
    .find({})
    // sorts users in alphabetical order
    .sort({ name: 1 })
    // returns only certain fields
    .select([
      'name', 'email', 'createdAt'
    ])

  res.status(200).json(users)
}

module.exports = getAll