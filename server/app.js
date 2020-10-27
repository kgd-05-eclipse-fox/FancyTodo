require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;
const routes = require('./routes/index')
const errorHandler = require('./middlewares/error-handler')

app.use(express.urlencoded({extended: false}))

app.use(express.json())

app.use(routes)

app.use(errorHandler);


app.listen(port, ()=> {
    console.log(`Listen to this http://localhost:${port}`);
})