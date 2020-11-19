const router = require('express').Router()
const UserController = require('../controllers/user-controller.js')

router.post('/register', UserController.registerUserHandler)
router.post('/login', UserController.loginUserHandler)

module.exports = router