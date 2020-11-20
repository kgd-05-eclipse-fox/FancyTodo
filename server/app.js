if(process.env.NODE_ENV != 'production') {
    require('dotenv').config();
  }
const express = require("express")
const cors = require('cors')
const app = express()
const port = process.env.PORT
const router = require('./routes')
const errorHandler = require('./middleware/errorHandler')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded( { extended: true }))
app.use(router)
app.use(errorHandler)

app.listen(port, ()=> {
    console.log(`app running at ${port}`)
})


