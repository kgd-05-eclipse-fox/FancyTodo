const router = require('express').Router()
const TodoController = require('../controller')


router.post('/', TodoController.addTodo)

module.exports = router