const router = require('express').Router()
const TodoController = require('../controllers/todo-controller.js')
const { authentication } = require('../middlewares/authentication.js')
const authorization = require('../middlewares/authorization.js')

router.use(authentication)
router.get('/', TodoController.getTodoHandler)
router.post('/', TodoController.createTodoHandler)

router.use('/:id', authorization)
router.get('/:id', TodoController.getTodoByIdHandler)
router.put('/:id', TodoController.updateTodoHandler)
router.patch('/:id', TodoController.patchTodoHandler)
router.delete('/:id', TodoController.deleteTodoHandler)

module.exports = router