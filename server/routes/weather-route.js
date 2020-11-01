const router = require('express').Router();
const WeatherController = require('../controllers/weather-controller')

router.get('/location', WeatherController.weathers);

module.exports = router;