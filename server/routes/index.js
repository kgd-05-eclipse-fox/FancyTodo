const routers = require('express').Router()
const todo = require('./todo.js')
const user = require('./user.js')
const post = require('./post.js')

routers.get('/', (req, res)=>{
    res.send('Home')
})

routers.use('/todos', todo)
routers.use('/user', user)
routers.use('/post', post)

module.exports = routers