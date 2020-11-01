const axios = require('axios')

const checkWeatherByIp = location => {
    return new Promise((res, rej) => {
        // * OpenWeatherMap Api ( https://openweathermap.org/api )
        axios({
            method: 'get',
            url: `${process.env.PRIVATE_WEATHER_URL}?lat=${location.lat}&lon=${location.lon}&appid=${process.env.PRIVATE_WEATHER_KEY}`
        })
            .then( weather => {
                let weatherData = []
                weather.data.weather.forEach( data => {
                    weatherData.push(data.main)
                })
                weatherData = weatherData.join(', ')
                
                const icon = `https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`;
    
                res({ location: weather.data.name, weather: weatherData, temperature: weather.data.main, icon })
            })
            .catch( err => {
                rej({ name: 'Failed to fetch Weather from Server' })
            })
    })
}



module.exports = checkWeatherByIp