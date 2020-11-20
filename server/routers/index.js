const router = require('express').Router()
const UserController = require('../controller/usercontroller')
const todos = require('./todos')
const userLogin = require('./user-login')
const userRegister = require('./user-register')

router.use('/todos', todos)
router.use('/register', userRegister)
router.use('/login', userLogin)
router.post('/googleSignIn', UserController.gLogin)

module.exports = router