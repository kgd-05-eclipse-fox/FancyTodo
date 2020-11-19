const { verifyToken } = require('../helpers/jwt.js')
const { User } = require('../models')

async function authentication (req, res, next) {
   const token = req.headers.access_token
   try {
      if (!token) {
         throw {msg: 'Authentication failed token', status: 401}
      } else {
         const decoded = verifyToken(token) 
         const user = await User.findOne({
            where: {
               email: decoded.email
            }
         })
         
         if (!user) {
            throw {msg: 'Authentication failed email', status: 401}
         } else {
            req.loggedInUser = decoded
            next()
         }
      }
   } catch(err) {
      next(err)
   }
}

module.exports = {
   authentication
}