const express = require('express')
const router = express.Router()

const todoRouter = require('./todoRouter')
const loginRouter = require('./loginRouter')
const registerRouter = require('./registerRouter')

// * Todo Router
router.use('/todos', todoRouter)

// * Login Router
router.use('/login', loginRouter)

// * Register Router
router.use('/register', registerRouter)

module.exports = router