const jwt = require('jsonwebtoken')

class JWTTokenUser{
    static tokenUser(data){
        const token = jwt.sign(data, process.env.RAHASIA)
        return token
    }
    
    static cekToken(data){
        const decoded = jwt.verify(data, process.env.RAHASIA);
        return decoded
    }
}

module.exports = JWTTokenUser
