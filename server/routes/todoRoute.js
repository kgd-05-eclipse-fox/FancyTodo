const express =require("express")
const router = express.Router()
const TodoController = require('../controllers/TodoController')
const authentication = require('../middleware/autheticate')
const authorization =  require('../middleware/authorization')


router.use(authentication)
router.post('/', TodoController.addTodos)
router.get('/', TodoController.findAll)
router.get('/:id', authorization,TodoController.getTodos)
router.put('/:id', authorization,TodoController.updateTodo)
router.patch('/:id', authorization,TodoController.editTodo)
router.delete('/:id', authorization, TodoController.destroyTodo)

module.exports = router