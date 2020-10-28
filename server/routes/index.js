const routers = require('express').Router()
const todo = require('./todo.js')
const user = require('./user.js')

routers.get('/', (req, res)=>{
    res.send('Home')
})
console.log(new Date())
routers.use('/todos', todo)
routers.use('/user', user)

module.exports = routers