const express =require("express")
const router = express.Router()
const TodoController = require('../controllers/TodoController')
const Authentication = require('../middleware/autheticate')


router.use(Authentication)
router.post('/',TodoController.addTodos)
router.get('/', TodoController.findAll)
router.get('/:id',TodoController.getTodos)
router.put('/:id',TodoController.updateTodo)
router.patch('/:id',TodoController.editTodo)
router.delete('/:id',TodoController.destroyTodo)

module.exports = router