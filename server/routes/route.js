const route = require('express').Router()
const Controller = require('../controllers/controllers.js')


route.post('/', Controller.addToDo)
route.get('/', Controller.showListTodos)

module.exports = route