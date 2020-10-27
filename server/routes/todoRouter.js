const express = require('express')
const router = express.Router()
const Controller = require('../controllers/todo-controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.post('/', Controller.postAddNewTodo)
router.get('/', Controller.getAllTodos)
router.get('/:id', authorization, Controller.getTodoById)
router.put('/:id', authorization, Controller.putUpdateTodo)
router.patch('/:id', authorization, Controller.patchTodoStatus)
router.delete('/:id', authorization, Controller.deleteTodoById)

module.exports = router