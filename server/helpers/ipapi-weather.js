const axios = require('axios')

const checkWeatherByIp = new Promise((res, rej) => {
    // * IP Api ( https://ipapi.co/api/#location-of-clients-ip )
    axios({
        method: 'get',
        url: process.env.PRIVATE_IP
    })
        .then( ({ data }) => {
            // * OpenWeatherMap Api ( https://openweathermap.org/api )
            return axios({
                method: 'get',
                url: `${process.env.PRIVATE_WEATHER_URL}${data.city}${process.env.PRIVATE_WEATHER_KEY}`
            })
        })
        .then( weather => {
            let weatherData = []
            weather.data.weather.forEach( data => {
                weatherData.push(data.main)
            })
            weatherData = weatherData.join(', ')

            res({ location: weather.data.name, weather: weatherData, temperature: weather.data.main })
        })
        .catch( err => {
            rej({ name: 'Failed to fetch Weather from Server' })
        })
})

module.exports = checkWeatherByIp