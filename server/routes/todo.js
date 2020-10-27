const routers = require('express').Router()
const TodoController = require('../controller/todo-controller.js')
const authentication = require('../middlewares/authentication.js')
const authorization = require('../middlewares/authorization.js')

routers.use(authentication)

routers.get('/', TodoController.getTodo)
routers.post('/', TodoController.postTodo)

routers.use(authorization)

routers.get('/:id', TodoController.getTodoById)
routers.put('/:id', TodoController.putTodo)
routers.patch('/:id', TodoController.patchTodo)
routers.delete('/:id', TodoController.deleteTodo)

module.exports = routers