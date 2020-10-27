const route = require('express').Router()
const Controller = require('../controllers/controllers.js')
const { authentication, authorization } = require('../middleware/auth')
const errorHandler = require('../middleware/errorHandler')

route.use(authentication)
route.post('/', Controller.addToDo, errorHandler)
route.get('/', Controller.showListTodos, errorHandler)
route.get('/:id', Controller.showTodoById, errorHandler)
route.put('/:id', Controller.updateTodoById, errorHandler)
route.patch('/:id', Controller.updateStatusById, errorHandler)
route.delete('/:id', authorization, Controller.deleteTodo, errorHandler)
module.exports = route