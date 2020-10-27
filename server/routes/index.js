const express = require('express')
const router = express.Router()

const userRouter = require('./userRouter')
const todoRouter = require('./todoRouter')

// * User Router (Login & Register)
router.use('/', userRouter)

// * Todo Router
router.use('/todos', todoRouter)

module.exports = router