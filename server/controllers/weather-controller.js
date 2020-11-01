const axios = require('axios');

class WeatherController {

    static weathers(req,res) {
        axios.get('https://ipinfo.io/', {
            params: {
                token: process.env.LOCATIONID
            }
        })
        .then(function(response) {
            const city = response.data.city;
            
            return axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    q: city,
                    appid: process.env.APPID
                }
            })
        })
        .then(function (response) {
            res.status(200).json(response.data)
        })
        .catch(function(err) {
            res.status()
        })
    }
}

module.exports = WeatherController;