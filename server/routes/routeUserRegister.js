const route = require('express').Router()
const ControllerUser = require('../controllers/controllerUser.js')
const errorHandler = require('../middleware/errorHandler')

route.post('/', ControllerUser.saveNewUser, errorHandler)

module.exports = route