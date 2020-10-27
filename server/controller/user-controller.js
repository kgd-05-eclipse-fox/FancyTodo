const {User} = require('../models')
const Super = require('../helper/super.js')
// const bcrypt = require('bcryptjs');

class UserController{
    static async register(req, res){
        try {
            let dataBody =  req.body
            let newData = Super.validasiRegister(dataBody.password)
            let dataUpuser = {
                email: dataBody.email,
                password: newData.password
            }
            let data = await User.create(dataUpuser)
            let postData = {
                id: data.id,
                email: data.email
            }
            res.status(201).json(postData)
        } catch (err) {
            res.status(400).json(err)
        }
    }

    static async login(req, res){
        try {
            let dataBody = req.body
            let dataBaseUsers = await User.findOne({
                where: {email: dataBody.email}
            })
            if(!dataBaseUsers){
                res.status(401).json({error: 'Email atau Password anda tidak Valid 1'})
            }else if(!Super.validasiLoginUser(dataBody.password, dataBaseUsers.password)){
                res.status(401).json({error: 'Email atau Password anda tidak Valid 2'})
            }else{
                let dataUser = {
                    id: dataBaseUsers.id,
                    email: dataBaseUsers.email
                }
                let userToken = Super.tokenUser(dataUser)
                dataUser.token = userToken
                res.status(200).json(dataUser)
            }
        } catch (err) {
            res.status(400).json(err)
        }
    }
}


module.exports = UserController