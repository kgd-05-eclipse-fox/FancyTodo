const jwt = require('jsonwebtoken')

const jwtSign = (payload) => {
    return jwt.sign(payload, process.env.PRIVATE_KEYSHA256)
}

const jwtVerify = (token) => {
    return jwt.verify(token, process.env.PRIVATE_KEYSHA256)
}

module.exports = { jwtSign, jwtVerify }