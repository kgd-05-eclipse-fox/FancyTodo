
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const routes = require('./routes/index');
const errorHandler = require('./middlewares/error-handler');

//body parser
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//routing
app.get('/', (req, res) => {
    res.status(200).json({msg: 'MASUK COK'})
})
app.use(routes)

//middleware
app.use(errorHandler);

app.listen(port, ()=> {
    console.log(`Listen to this http://localhost:${port}`);
})