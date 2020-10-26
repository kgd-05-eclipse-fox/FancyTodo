const router = require('express').Router()
const TodoController = require('../controller')

router.get('/', TodoController.showAllTodoList)
router.post('/', TodoController.addTodo)
router.get('/:id', TodoController.getTodoById)
router.put('/:id', TodoController.putTodo)
router.patch('/:id', TodoController.patchTodo)
router.delete('/:id', TodoController.deleteTodo)

module.exports = router