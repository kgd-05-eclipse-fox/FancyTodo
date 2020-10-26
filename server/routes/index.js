const routers = require('express').Router()
const todo = require('./todo.js')

routers.get('/', (req, res)=>{
    res.send('Home')
})

routers.use('/todos', todo)

module.exports = routers