const express =require("express")
const router = express.Router()
const TodoController = require('../controllers/TodoController')

router.get('/', TodoController.findAll)
router.put('/:id', TodoController.updateTodo)

module.exports = router