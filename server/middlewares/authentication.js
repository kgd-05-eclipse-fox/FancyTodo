const { jwtVerify } = require('../helpers/jwt')
const { User } = require('../models/')

async function authentication (req, res, next) {
    try {
        const access_token = req.headers.access_token
        const userlocation = JSON.parse(req.headers.userlocation)
        if (!access_token) {
            throw { name: 'Unauthorized' }
        } else {
            const user = jwtVerify(access_token)
            const findUser = await User.findOne({ where: { email: user.email }})
            if (findUser) {
                req.whoIsLoggedIn = user
                req.userLocation = userlocation
                next()
            } else {
                throw { name: 'Unauthorized' }
            }
        }
    } catch (error) {
        next(error)
    }
}

module.exports = authentication