const jwt = require('jsonwebtoken')

function getToken(data) {
    const token = jwt.sign(data, process.env.SECRET)
    return token
}

function verifyToken(data) {
    const decodeToken = jwt.verify(data, process.env.SECRET)
    return decodeToken
}
module.exports = {
    getToken,
    verifyToken
}