const { Router } = require('express')
const getAll = require('../controllers/users/getAll')
const getOne = require('../controllers/users/getOne')
const update = require('../controllers/users/update')
const remove = require('../controllers/users/remove')

// const requireAuth = require('../middleware/requireAuth')

const router = Router()

// router.use(requireAuth)

router.get('/', getAll)

router.get('/:id', getOne)

router.patch('/:id', update)

router.delete('/:id', remove)

module.exports = router