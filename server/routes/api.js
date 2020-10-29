const routers = require('express').Router()
const apiConteroller = require('../controller/api-cintroller.js')

routers.get('/data', apiConteroller.getData)

module.exports = routers