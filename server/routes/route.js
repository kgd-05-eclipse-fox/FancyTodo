const route = require('express').Router()
const Controller = require('../controllers/controllers.js')
const { authentication, authorization } = require('../middleware/auth')


route.post('/', authentication, Controller.addToDo)
route.get('/', authentication, Controller.showListTodos)
route.get('/:id', Controller.showTodoById)
route.put('/:id', Controller.updateTodoById)
route.patch('/:id', Controller.updateStatusById)
route.delete('/:id', authentication, authorization, Controller.deleteTodo)
module.exports = route