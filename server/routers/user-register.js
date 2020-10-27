const router = require('express').Router()
const UserController = require('../controller/user-controller')

router.post('/', UserController.postUserRegister)

module.exports = router