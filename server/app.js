const express = require('express')
const app = express()
const port = 3000
const routeToDo = require('./routes/route.js')


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/todos', routeToDo)
app.listen(port, () => {
    console.log('success listen at port ' + port)
})
