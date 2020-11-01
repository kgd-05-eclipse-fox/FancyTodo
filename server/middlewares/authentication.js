const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

async function authentication(req, res, next) {
    const { token } = req.headers
    try {
        if (!token) {
            throw { msg: 'Authentication Failed.', status: 401 }
        } else {
            const decoded = verifyToken(token)
            const user = await User.findOne({
                where: {
                    email: decoded.data.email
                }
            })
            if (!user) {
                throw { msg: 'Authentication Failed.', status: 401 }
            } else {
                req.loggedInUser = decoded.data
                next()
            }
        }
    } catch (err) {
        console.log(err)
        const status = err.status || 500
        const msg = err.msg || 'Internal Server Error'
        res.status(status).json({ error: msg })
    }
}

module.exports = { authentication }