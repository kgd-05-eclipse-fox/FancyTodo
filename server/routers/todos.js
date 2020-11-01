const router = require('express').Router()
const TodoController = require('../controller/todo-controller')
const { authentication } = require('../middlewares/authentication')
const { authorization } = require('../middlewares/authorization')

router.use(authentication)
router.get('/', TodoController.showAllTodoList)
router.post('/', TodoController.addTodo)
router.get('/completed', TodoController.showCompleted)
router.use('/:id', authorization)
router.get('/:id', TodoController.getTodoById)
router.put('/:id', TodoController.putTodo)
router.patch('/:id', TodoController.patchTodo)
router.delete('/:id', TodoController.deleteTodo)

module.exports = router