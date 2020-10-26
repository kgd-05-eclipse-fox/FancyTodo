const express = require('express')
const router = express.Router()
const Controller = require('../controllers/todo-controller')

router.post('/', Controller.postAddNewTodo)
router.get('/', Controller.getAllTodos)
router.get('/:id', Controller.getTodoById)
router.put('/:id', Controller.putUpdateTodo)
router.patch('/:id', Controller.patchTodoStatus)
router.delete('/:id', Controller.deleteTodoById)

module.exports = router