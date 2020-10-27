const routers = require('express').Router()
const TodoController = require('../controller/todo-controller.js')
const authentication = require('../middlewares/authentication.js')

routers.get('/',authentication , TodoController.getTodo)
routers.post('/', TodoController.postTodo)
routers.get('/:id', TodoController.getTodoById)
routers.put('/:id', TodoController.putTodo)
routers.patch('/:id', TodoController.patchTodo)
routers.delete('/:id', TodoController.deleteTodo)

module.exports = routers