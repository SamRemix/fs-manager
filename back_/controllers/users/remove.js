const User = require('../../models/users')
const { Types } = require('mongoose')

const remove = async ({ params }, res) => {
  const { id } = params

  // checks if id is a valid objectId
  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such user, invalid id' })
  }

  const user = await User.findOneAndDelete({ _id: id })

  if (!user) {
    return res.status(404).json({ error: 'No such user' })
  }

  res.status(200).json(user)
}

module.exports = remove