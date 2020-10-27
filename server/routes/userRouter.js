const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user-controller')

router.post('/login', UserController.postUserLogin)
router.post('/register', UserController.postUserRegister)

module.exports = router