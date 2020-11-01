const {verifyToken} = require('../helpers/jwt')
const {User} = require('../models/index')

async function authentication (req, res, next){
    const {token} = req.headers
    try {
        if(!token){
            res.status(401).json('Authentication failed')
        }else {
            const decoded = verifyToken(token)
            const user = await User.findOne({
                where : {
                    email : decoded.email,
                    id : decoded.id
                }
            })
            if (!user) {
                throw {error : 'Authentication failed', status : 401 }
            } else {
                req.loggedIn = decoded
                next()
            }
        }
    }
    catch(error){
        const status = error.status || 500
        const msg = error.msg || 'Internal Server Error'
        res.status(status).json({ error : msg})
    }
}
module.exports = authentication