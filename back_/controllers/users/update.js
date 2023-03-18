const User = require('../../models/users')
const { Types } = require('mongoose')
const { isEmail, isStrongPassword } = require('validator')

const update = async (req, res) => {
  // const { _id } = req.user
  const { id: _id } = req.params
  const { name, email, password, newPassword } = req.body

  if (!Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: 'No such user, invalid id' })
  }

  const curr = await User.findOne({ _id })

  if (!curr) {
    return res.status(400).json({ error: 'No such user' })
  }

  if (name && name.trim().length < 3) {
    return res.status(400).json({ error: 'Name must be at least 3 characters' })
  }

  if (email && email !== curr.email) {
    const exists = await User.findOne({ email })

    if (exists) {
      return res.status(400).json({ error: 'Email already in use' })
    }

    if (!isEmail(email)) {
      return res.status(400).json({ error: 'Email is not valid' })
    }
  }

  let hashPassword = ''

  if (password && newPassword) {
    const match = await compare(password, curr.password)

    if (!match) {
      return res.status(400).json({ error: 'Incorrect password' })
    }

    if (!isStrongPassword(newPassword)) {
      return res.status(400).json({ error: 'New password isn\'t strong enough' })
    }

    const salt = await genSalt(10)
    hashPassword = await hash(newPassword, salt)
  }

  const user = await User
    .findOneAndUpdate({ _id }, {
      name,
      email,
      password: hashPassword === '' ? curr.password : hashPassword
    }, {
      // return user with updated data
      new: true
    })

  res.status(200).json(user)
}

module.exports = update