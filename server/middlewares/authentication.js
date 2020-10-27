const Super = require('../helper/super.js')
const {User} = require('../models')

async function authentication(req, res, next){
    // console.log(req.headers)
    let token = req.headers.token
    try {
        if(!token){
            throw({msg: 'invalid token', status: 401})
        }else{
            let cekToken = Super.cekToken(token)
            console.log(cekToken)
        }
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = authentication