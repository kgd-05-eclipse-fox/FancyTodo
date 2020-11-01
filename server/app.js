require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT
const cors = require('cors')

const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.urlencoded( { extended: true }))
app.use(express.json())
app.use(cors())

app.use(router)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`FancyTodo Running at https://guarded-hamlet-08953.herokuapp.com || http://127.0.0.1:${PORT}`);
})

// * DONE! IS DONE!