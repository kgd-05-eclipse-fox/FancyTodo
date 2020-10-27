const router = require('express').Router()
const TodoController = require('../controller/todo-controller')
const { authentication } = require('../middlewares/authentication')

router.get('/', authentication, TodoController.showAllTodoList)
router.post('/', authentication, TodoController.addTodo)
router.get('/:id', authentication, TodoController.getTodoById)
router.put('/:id', authentication, TodoController.putTodo)
router.patch('/:id', authentication, TodoController.patchTodo)
router.delete('/:id', authentication, TodoController.deleteTodo)

module.exports = router