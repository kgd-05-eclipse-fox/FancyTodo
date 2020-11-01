const express = require('express')
const router = express.Router()

const TodoRouter = require('./todo.js')
const UserRouter = require('./user.js')
const MovieRouter = require('./movie.js')

router.use('/', UserRouter)
router.use('/todos', TodoRouter)
router.use('/movies', MovieRouter)

module.exports = router