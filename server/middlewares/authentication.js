
class Authentication{
    static authentication(req, res, next){
        console.log('ini di authentication')
        next()
    }
}

module.exports = Authentication