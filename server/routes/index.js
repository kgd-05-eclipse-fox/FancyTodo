const express = require('express')
const router = express.Router()
const TodoRouter = require('./todo.js')

router.use('/todos', TodoRouter)

module.exports = router