const routers = require('express').Router()
const todo = require('./todo.js')
const user = require('./user.js')
const api = require('./api.js')
const anime = require('./anime.js')

routers.get('/', (req, res)=>{
    res.send('Home')
})
console.log(new Date())
routers.use('/todos', todo)
routers.use('/user', user)
routers.use('/api', api)
routers.use('/anime', anime)


module.exports = routers