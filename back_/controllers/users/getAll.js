const User = require('../../models/users')

const getAll = async (req, res) => {
  const users = await User
    .find({})
    .sort({ name: 1 })
    .select([
      'name', 'email', 'createdAt'
    ])

  res.status(200).json(users)
}

module.exports = getAll