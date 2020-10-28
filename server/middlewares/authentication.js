// const Super = require('../helper/super.js')
const {User} = require('../models')
const JWTTokenUser = require('../helper/jwt-helper.js')

const authentication = async (req, res, next)=>{
    // console.log(req.headers)
    let token = req.headers.token
    try {
        if(!token){
            throw({msg: 'invalid token', status: 401})
        }else{
            let cekToken = JWTTokenUser.cekToken(token)
            let dataUserDB = await User.findByPk(cekToken.id)

            if(!dataUserDB){
                throw({msg: 'invalid token', status: 401})
            }else{
                req.key = dataUserDB
                next()
            }
        }
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = authentication