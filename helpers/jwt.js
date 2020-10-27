require('dotenv').config()
const jwt = require('jsonwebtoken')


function signToken(payload){
    const token = jwt.sign(payload, process.env.SECRET)
    return token
}

function verifyToken(token){
    const verToken = jwt.verify(token, process.env.SECRET)
    return verToken
}

module.exports = {
    signToken,
    verifyToken
}