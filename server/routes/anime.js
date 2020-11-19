const routers = require('express').Router()
const AnimeController = require('../controller/anime-controller.js')

routers.get('/', AnimeController.getdata)

module.exports = routers