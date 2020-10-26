const express = require("express")
const router = express.Router()
const todoRoute = require("./todoRoute")

router.use('/todos', todoRoute)

module.exports = router