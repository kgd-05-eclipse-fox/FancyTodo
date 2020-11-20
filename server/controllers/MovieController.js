const axios = require('axios')

class MovieController {
    static getPopularMovie(req, res, next) {
        let listMovie
        let selectedMovie = []
      
        axios({
          url: 'https://api.themoviedb.org/3/movie/popular',
          method: 'get',
          params: {
            api_key: 'c795d2b4445cff38a8b9b3b782b69b77'
          }
        })
      
        .then(movies => {
          listMovie = movies.data.results.map(el =>{
            return {
              id: el.id,
              title: el.title,
              poster_path: 'https://image.tmdb.org/t/p/w342/' + el.poster_path
            }
          })
          return axios({
            url: 'https://newsapi.org/v2/everything',
            method: 'get',
            params: {
              apiKey: '01e5c7cdc17647f7a9cba22b48469591',
              q: 'movie'
            }
          })
        })
        .then(result => {
          let news = result.data.articles
          let selectedNews = news[Math.floor(Math.random() * news.length)]
          let filteredNews = {
            source: selectedNews.source.name,
            author: selectedNews.author,
            title: selectedNews.title,
            description: selectedNews.description
          }
          for (let i = 0; i < 12; i++) {
            selectedMovie.push(listMovie[i])
          }
          res.status(200).json({news: filteredNews, movies: selectedMovie})
        })
        .catch(err => {
          next(err)
        })
      }
}


module.exports = MovieController