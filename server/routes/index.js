const router = require('express').Router();
const todoRouter = require('./todo');
const UserController = require('../controllers/user-controller')
const weatherRouter = require('./weather-route');

router.use('/todos', todoRouter);

router.use('/weathers', weatherRouter);

router.post('/register', UserController.register);

router.post('/login', UserController.login);



module.exports = router;