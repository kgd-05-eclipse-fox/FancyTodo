const {User} = require('../models')
const Super = require('../helper/super.js')

class UserController{
    static async register(req, res){
        try {
            let dataBody =  req.body
            let validasidata = Super.validasiRegister(dataBody)

            if(validasidata.length>0){
                res.status(400).json(validasidata)
            }else{
                let data = await User.create(dataBody)
                res.status(201).json(data)
            }
        } catch (err) {
            res.status(400).json(err)
        }
    }

    static async login(req, res){
        try {
            let dataBaseUsers = await User.findAll()
            let dataBody = req.body
            let validasiLogin = Super.validasiLoginUser(dataBaseUsers, dataBody)

            if(validasiLogin.length>0){
                res.status(400).json(validasiLogin)
            }else{
                res.status(200).json(dataBody)
            }
        } catch (err) {
            res.status(400).json(err)
        }
    }
}


module.exports = UserController