const User = require('../models/users')
const { Types } = require('mongoose')
const { genSalt, hash, compare } = require('bcrypt')
const { isEmail, isStrongPassword } = require('validator')

const getUsers = async (req, res) => {
  const users = await User
    .find({})
    .sort({ name: 1 })
    .select([
      'name', 'email', 'createdAt'
    ])

  res.status(200).json(users)
}

const getUser = async (req, res) => {
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

const updateUser = async (req, res) => {
  // const { _id } = req.user
  const { id: _id } = req.params
  const { name, email, password, newPassword } = req.body

  if (!Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: 'No such user, invalid id' })
  }

  const curr = await User.findOne({ _id })
  console.log(curr);

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

  console.log(password, newPassword, hashPassword);

  const user = await User
    .findOneAndUpdate({ _id }, {
      name,
      email,
      password: hashPassword === '' ? curr.password : hashPassword
    }, {
      // return user with updated data
      new: true
    })

  console.log(user.password);

  res.status(200).json(user)
}

const deleteUser = async (req, res) => {
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

module.exports = { getUsers, getUser, updateUser, deleteUser }