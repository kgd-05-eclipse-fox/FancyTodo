const routers = require('express').Router()
const UserController = require('../controller/user-controller.js')

routers.post('/register', UserController.register)
routers.post('/login', UserController.login)
routers.post('/loginGoogle', UserController.loginGoogle)

module.exports = routers