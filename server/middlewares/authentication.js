const { jwtVerify } = require('../helpers/jwt-batman')
const { User } = require('../models/')

async function authentication (req, res, next) {
    try {
        const access_token = req.headers.access_token
        if (!access_token) {
            throw { msg: 'Unauthorized', status: 401 }
        } else {
            const user = jwtVerify(access_token)
            const findUser = await User.findOne({ where: { email: user.email }})
            if (findUser) {
                req.whoIsLoggedIn = user
                next()
            } else {
                throw { msg: 'Unauthorized', status: 401 }
            }
        }
    } catch (error) {
        res.status(error.status).json({ error: error.msg })
    }
}

module.exports = authentication