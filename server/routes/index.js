const express = require('express')
const router = express.Router()

const TodoRouter = require('./todo.js')
const UserRouter = require('./user.js')

router.use('/', UserRouter)
router.use('/todos', TodoRouter)

module.exports = router