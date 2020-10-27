const {verifyToken} = require('../helpers/jwt')
const {User} = require('../models/index')

async function Authentication (req, res, next){
    try {
        const {token} = req.headers
        if(!token){
            res.status(401).json('error')
        }else {
            const decoded = verifyToken(token)
            const user = await User.findOne({
                where : {
                    email : decoded.email,
                    id : decoded.id
                }
            })
            if (!user) {
                throw {error : 'error' }
            } else {
                req.loggedIn = decoded
               
                next()
            }
        }
    }
    catch(error){
        res.status(401).json('error')
    }
}
module.exports = Authentication