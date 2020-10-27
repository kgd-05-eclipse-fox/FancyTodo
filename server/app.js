require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const routeToDo = require('./routes/route.js')
const routeUserRegister = require('./routes/routeUserRegister.js')
const routeUserLogin = require('./routes/routeUserLogin.js')


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/todos', routeToDo)
app.use('/register', routeUserRegister)
app.use('/login', routeUserLogin)
app.listen(port, () => {
    console.log('success listen at port ' + port)
})
