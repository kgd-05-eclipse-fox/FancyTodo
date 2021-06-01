if(process.env.NODE_ENV != "production") {
    require('dotenv').config()
}
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const routeToDo = require('./routes/route.js')
const routeUserRegister = require('./routes/routeUserRegister.js')
const routeUserLogin = require('./routes/routeUserLogin.js')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.get('/', function(req, res) {
    res.status(200).json({ msg: "masuk" })
})
app.use('/todos', routeToDo)
app.use('/register', routeUserRegister)
app.use('/login', routeUserLogin)
app.listen(port, () => {
    console.log('success listen at port ' + port)
})
