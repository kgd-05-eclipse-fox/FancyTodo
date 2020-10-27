require('dotenv').config()

const express = require('express')
const app = express()
const port = +process.env.PORT
const routers = require('./routers')


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', routers)


app.listen(port, () => {
    console.log(`app listening to http://localhost:${port}`)
})