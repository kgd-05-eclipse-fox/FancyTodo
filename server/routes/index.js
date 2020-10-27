const routers = require('express').Router()
const todo = require('./todo.js')
const UserController = require('../controller/user-controller.js')

routers.get('/', (req, res)=>{
    res.send('Home')
})

routers.post('/register', UserController.register)
routers.post('/login', UserController.login)

routers.use('/todos', todo)

module.exports = routers