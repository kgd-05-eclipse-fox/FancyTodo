const route = require('express').Router()
const ControllerUser = require('../controllers/controllerUser.js')

route.post('/', ControllerUser.loginUser)

module.exports = route