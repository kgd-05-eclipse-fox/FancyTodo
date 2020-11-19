const router = require('express').Router()
const MovieController = require('../controllers/movie-controller.js')

router.get('/popular', MovieController.findPopular)

module.exports = router