require('dotenv').config()

const express = require('express')
const app = express()
const port = +process.env.PORT
const routers = require('./routers')
const { errorHandler } = require('../server/middlewares/errorhandler')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', routers)
app.use(errorHandler)


app.listen(port, () => {
    console.log(`app listening to http://localhost:${port}`)
})