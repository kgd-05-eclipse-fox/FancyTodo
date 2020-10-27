const routers = require('express').Router()
const TodoController = require('../controller/todo-controller.js')
const Authentication = require('../middlewares/authentication.js')

// routers.get('/', (req, res, next)=>{
//     console.log('ini di post')
//     // res.status(200).json('ini di post')
//     next()
// },Authentication.authentication , TodoController.getTodo)

module.exports = routers