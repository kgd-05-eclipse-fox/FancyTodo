const axios = require('axios')

class MovieController {
  static findPopular (req, res, next) {
    axios({
      url: 'https://api.themoviedb.org/3/movie/popular',
      method: 'get',
      headers: {
        Authorization: `Bearer ${process.env.TOKEN_MDB}`
      }
    })
    .then(response => {
      res.status(200).json(response.data.results)
    }).catch((err) => {
      next(err)
    });
  }
}

module.exports = MovieController