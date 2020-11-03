if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT
const routers = require('./routes')
const errorHandler = require('./middlewares/errorHandler.js')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(routers)
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`Let's Go to app FancyTodo http://localhost:${port}`)
})