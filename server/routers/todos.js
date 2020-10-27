const router = require('express').Router()
const TodoController = require('../controller/todo-controller')
const { authentication } = require('../middlewares/authentication')
const { authorization } = require('../middlewares/authorization')

router.use(authentication)
router.get('/', TodoController.showAllTodoList)
router.post('/', TodoController.addTodo)
router.get('/:id', TodoController.getTodoById)
router.put('/:id',authorization, TodoController.putTodo)
router.patch('/:id',authorization, TodoController.patchTodo)
router.delete('/:id', authorization, TodoController.deleteTodo)

module.exports = router