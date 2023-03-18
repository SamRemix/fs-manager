const { Router } = require('express')
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/users')
// const requireAuth = require('../middleware/requireAuth')

const router = Router()

// router.use(requireAuth)

router.get('/', getUsers)

router.get('/:id', getUser)

router.patch('/:id', updateUser)

router.delete('/:id', deleteUser)

module.exports = router