var jwt = require('jsonwebtoken');


const createToken = data => {
    const token = jwt.sign({ data }, process.env.SECRET)
    return token
}

const verifyToken = token => {
    const decoded = jwt.verify(token, process.env.SECRET)
    return decoded
}

module.exports = { createToken, verifyToken }