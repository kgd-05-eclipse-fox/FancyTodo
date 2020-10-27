const jwt = require('jsonwebtoken');

const signToken = payload => {
    const token = jwt.sign(payload, 'secret')
    return token;
}


module.exports = {
    signToken
}


