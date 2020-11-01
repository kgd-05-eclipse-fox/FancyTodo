require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')
// body parser
app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({extended:true}))
app.use(router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})