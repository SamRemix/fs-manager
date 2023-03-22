const User = require('../../models/users')
const { Types } = require('mongoose')

const getOne = async ({ params }, res) => {
  const { id } = params

  // checks if id is a valid objectId
  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid id' })
  }

  const user = await User
    .findOne({ _id: id })
    // returns only certain fields
    .select([
      '_id', 'name', 'email', 'createdAt', 'updatedAt'
    ])

  if (!user) {
    return res.status(400).json({ error: 'No such user' })
  }

  res.status(200).json(user)
}

module.exports = getOne