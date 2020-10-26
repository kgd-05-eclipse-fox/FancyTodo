const route = require('express').Router()
const Controller = require('../controllers/controllers.js')


route.post('/', Controller.addToDo)
route.get('/', Controller.showListTodos)
route.get('/:id', Controller.showTodoById)
route.put('/:id', Controller.updateTodoById)
module.exports = route