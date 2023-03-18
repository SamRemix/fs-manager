const User = require('../../models/users')
const { Types } = require('mongoose')

const getOne = async (req, res) => {
  // const { _id } = req.user
  const { id: _id } = req.params

  if (!Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: 'No such user, invalid id' })
  }

  const user = await User
    .findOne({ _id })
    .select([
      '_id', 'name', 'email', 'createdAt', 'updatedAt'
    ])

  if (!user) {
    return res.status(400).json({ error: 'No such user' })
  }

  res.status(200).json(user)
}

module.exports = getOne