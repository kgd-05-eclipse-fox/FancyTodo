const { jwtVerify } = require('../helpers/jwt-batman')
const { User } = require('../models/')

async function authentication (req, res, next) {
    try {
        const access_token = req.headers.access_token
        if (!access_token) {
            throw { name: 'Unauthorized' }
        } else {
            const user = jwtVerify(access_token)
            const findUser = await User.findOne({ where: { email: user.email }})
            if (findUser) {
                req.whoIsLoggedIn = user
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