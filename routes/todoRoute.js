const express =require("express")
const router = express.Router()
const TodoController = require('../controllers/TodoController')
const Authentication = require('../middleware/autheticate')
const authorization =  require('../middleware/authorization')


router.use(Authentication)
router.post('/',TodoController.addTodos)
router.get('/', TodoController.findAll)
router.get('/:id',TodoController.getTodos)
router.put('/:id',TodoController.updateTodo)
router.patch('/:id',TodoController.editTodo)
router.delete('/:id', authorization, TodoController.destroyTodo)

module.exports = router