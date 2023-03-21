const User = require('../../models/users')
const { Types } = require('mongoose')
const { compare, genSalt, hash } = require('bcrypt')
const { isEmail, isStrongPassword } = require('validator')

const update = async (req, res) => {
  const { id } = req.params
  const { name, email, password, newPassword } = req.body

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such user, invalid id' })
  }

  const curr = await User.findOne({ _id: id })

  if (!curr) {
    return res.status(400).json({ error: 'No such user' })
  }

  if (name && name.trim().length < 3) {
    return res.status(400).json({ error: 'Name must be at least 3 characters' })
  }

  // check if request email isn't equal to current user email
  if (email && email !== curr.email) {
    const exists = await User.findOne({ email })

    if (exists) {
      return res.status(400).json({ error: 'Email already in use' })
    }

    // check email validity
    if (!isEmail(email)) {
      return res.status(400).json({ error: 'Email is not valid' })
    }
  }

  // define the new hashed password if password and newPassword are set 
  let hashPassword

  if (password && newPassword) {
    // compare request password with current user password
    const match = await compare(password, curr.password)

    if (!match) {
      return res.status(400).json({ error: 'Incorrect password' })
    }

    // check newPassword validity
    if (!isStrongPassword(newPassword)) {
      return res.status(400).json({ error: 'New password isn\'t strong enough' })
    }

    const salt = await genSalt(10)
    hashPassword = await hash(newPassword, salt)
  }

  // check if password or newPassword exists but not both
  if (!password && newPassword) {
    return res.status(400).json({ error: 'Incorrect password' })
  }

  if (password && !newPassword) {
    return res.status(400).json({ error: 'New password required' })
  }

  const user = await User
    .findOneAndUpdate({ _id: id }, {
      name,
      email,
      // if hashPassword is undefined, return current user password
      password: hashPassword || curr.password
    }, {
      // return user with updated data
      new: true
    })

  res.status(200).json(user)
}

module.exports = update