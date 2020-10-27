const jwt = require('jsonwebtoken')

function signToken (payload) {
   const token = jwt.sign(payload, process.env.SECRET)

   return token
}

module.exports = {
   signToken
}