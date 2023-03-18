const User = require('../../models/users')
const { Types } = require('mongoose')

const remove = async (req, res) => {
  const { id } = req.params

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