require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/error-handler');

//body parser
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//routing
app.use(routes)

//middleware
app.use(errorHandler);


app.listen(port, ()=> {
    console.log(`Listen to this http://localhost:${port}`);
})