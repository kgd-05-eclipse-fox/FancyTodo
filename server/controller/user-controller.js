const {User} = require('../models')
const BcryptValidasiUser = require('../helper/bcrypt-helper.js')
const JWTTokenUser = require('../helper/jwt-helper.js')
// const Super = require('../helper/super.js')

class UserController{
    static async register(req, res, next){
        try {
            let dataBody =  req.body
            console.log(dataBody, 'benar' )
            let newData = BcryptValidasiUser.validasiRegister(dataBody.password)
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
            next(err)
        }
    }

    static async login(req, res, next){
        try {
            let dataBody = req.body
            let dataBaseUsers = await User.findOne({
                where: {email: dataBody.email}
            })
            if(!dataBaseUsers){
                let error ={
                    key: 'Email salah',
                    status: 401,
                    msg: 'Email atau Password anda tidak Valid 1'
                }
                throw error
            }else if(!BcryptValidasiUser.validasiLoginUser(dataBody.password, dataBaseUsers.password)){
                let error = {
                    key: 'password salah',
                    status: 401,
                    msg: 'Email atau Password anda tidak Valid 2'
                }
                throw error
            }else{
                let dataUser = {
                    id: dataBaseUsers.id,
                    email: dataBaseUsers.email
                }
                let userToken = JWTTokenUser.tokenUser(dataUser)
                dataUser.token = userToken
                res.status(200).json(dataUser)
            }
        } catch (err) {
            next(err)
        }
    }
}


module.exports = UserController