const route = require('express').Router()
const Controller = require('../controllers/controllers.js')


route.post('/', Controller.addToDo)

module.exports = route