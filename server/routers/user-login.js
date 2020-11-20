const router = require('express').Router()
const UserController = require('../controller/usercontroller')

router.post('/', UserController.login)

module.exports = router