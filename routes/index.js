const express = require("express")
const router = express.Router()
const todoRoute = require("./todoRoute")
const UserController = require('../controllers/UserController')

router.use('/todos', todoRoute)
router.use('/register', UserController.register)
router.use('/login', UserController.login)

module.exports = router