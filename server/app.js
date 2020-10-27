require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT
const routers = require('./routes')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(routers)

app.listen(port, ()=>{
    console.log(`Let's Go to app FancyTodo http://localhost:${port}`)
})