const User = require('../../models/users')
const { Types } = require('mongoose')
const { compare, genSalt, hash } = require('bcrypt')
const { isEmail, isStrongPassword } = require('validator')

const update = async ({ params, body }, res) => {
  const { id } = params
  const { name, email, password, newPassword } = body

  // checks if id is a valid objectId
  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such user, invalid id' })
  }

  // finds current user based on id
  const currentUser = await User.findOne({ _id: id })

  if (!currentUser) {
    return res.status(400).json({ error: 'No such user' })
  }

  if (name && name.trim().length < 3) {
    return res.status(400).json({ error: 'Name must be at least 3 characters' })
  }

  // checks if request email isn't equal to current user email
  if (email && email !== currentUser.email) {
    const exists = await User.findOne({ email })

    if (exists) {
      return res.status(400).json({ error: 'Email already in use' })
    }

    // checks email validity
    if (!isEmail(email)) {
      return res.status(400).json({ error: 'Email is not valid' })
    }
  }

  // defines the new hashed password if password and newPassword are set 
  let hashPassword

  if (password && newPassword) {
    // compares request password with current user password
    const match = await compare(password, currentUser.password)

    if (!match) {
      return res.status(400).json({ error: 'Incorrect password' })
    }

    // checks newPassword validity
    if (!isStrongPassword(newPassword)) {
      return res.status(400).json({ error: 'New password isn\'t strong enough' })
    }

    const salt = await genSalt(10)
    hashPassword = await hash(newPassword, salt)
  }

  // checks if password or newPassword exists but not both
  if (!password && newPassword) {
    return res.status(400).json({ error: 'Incorrect password' })
  }

  // if (password && !newPassword) {
  //   return res.status(400).json({ error: 'New password required' })
  // }

  const user = await User
    .findOneAndUpdate({ _id: id }, {
      name: name || currentUser.name,
      email,
      // if hashPassword is undefined, return current user password
      password: hashPassword || currentUser.password
    }, {
      // returns user with updated data
      new: true
    })

  res.status(200).json(user)
}

module.exports = update