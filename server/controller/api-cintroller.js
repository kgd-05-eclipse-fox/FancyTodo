const axios = require('axios')

class ApiController{

    static async getData(req, res, next){
        try {
            let data = await axios({
                method: 'get',
                url: 'https://binaryjazz.us/wp-json/genrenator/v1'
            })
            res.status(200).json(data.data)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ApiController