const { verifyToken } = require('../helpers/jwt')

const { User } = require('../models');

const authentication = (req, res, next) => {
    const { token } = req.headers
    if (!token) { //when token is equals to false
        throw {msg: 'Authentication failed', status: 401}
    } else {
        const decoded = verifyToken(token);
        User.findAll({
            where: {
                email: decoded.email
            }
        })
        .then(user => {
            if (!user) {
                throw { msg: 'Authentication failed', status: 401 }
            } else {
                req.loggedInUser = decoded;
                next();
            }
        })
        .catch(err=> {
            next(err)
        })
    }
}

module.exports = {
    authentication
}