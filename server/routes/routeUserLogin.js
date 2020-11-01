const route = require('express').Router()
const ControllerUser = require('../controllers/controllerUser.js')
const errorHandler = require('../middleware/errorHandler')

route.post('/', ControllerUser.loginUser, errorHandler)
route.post('/google', ControllerUser.loginUser, errorHandler)

module.exports = route