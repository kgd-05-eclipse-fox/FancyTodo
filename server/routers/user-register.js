const router = require('express').Router()
const UserController = require('../controller/usercontroller')

router.post('/', UserController.postUserRegister)

module.exports = router