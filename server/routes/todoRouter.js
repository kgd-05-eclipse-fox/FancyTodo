const express = require('express')
const router = express.Router()
const Controller = require('../controllers/todo-controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

// All Routes need // ! authentication
router.use(authentication)
router.post('/', Controller.postAddNewTodo)
router.get('/', Controller.getAllTodos)

// Params :id Routes need // ! authorization
router.use('/:id', authorization)
router.get('/:id', Controller.getTodoById)
router.put('/:id', Controller.putUpdateTodo)
router.patch('/:id', Controller.patchTodoStatus)
router.delete('/:id', Controller.deleteTodoById)

module.exports = router