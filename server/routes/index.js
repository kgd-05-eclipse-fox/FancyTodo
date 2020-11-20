const express = require("express")
const router = express.Router()
const todoRoute = require("./todoRoute")
const UserController = require('../controllers/UserController')
const movieRouter = require('./movieRouter')
router.post('/loginGoogle', UserController.loginGoogle);


router.use('/todos', todoRoute)
router.use('/register', UserController.register)
router.use('/login', UserController.login)
router.use('/movies', movieRouter)

module.exports = router