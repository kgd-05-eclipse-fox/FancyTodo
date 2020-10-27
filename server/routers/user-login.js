const router = require('express').Router()
const UserController = require('../controller/user-controller')

router.post('/', UserController.login)

module.exports = router