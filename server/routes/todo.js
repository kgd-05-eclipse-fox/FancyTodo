const router = require('express').Router()
const TodoController = require('../controllers/todo-controller.js')

router.get('/', TodoController.getTodoHandler)
router.post('/', TodoController.createTodoHandler)
router.get('/:id', TodoController.getTodoByIdHandler)
router.put('/:id', TodoController.updateTodoHandler)
router.patch('/:id', TodoController.patchTodoHandler)
router.delete('/:id', TodoController.deleteTodoHandler)

module.exports = router