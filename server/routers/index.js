const router = require('express').Router()
const todos = require('./todos')
const userLogin = require('./user-login')
const userRegister = require('./user-register')

router.use('/todos', todos)
router.use('/register', userRegister)
router.use('/login', userLogin)

module.exports = router