const {User} = require('../models')
const BcryptValidasiUser = require('../helper/bcrypt-helper.js')
const JWTTokenUser = require('../helper/jwt-helper.js')
const {OAuth2Client} = require('google-auth-library')

class UserController{
    static async register(req, res, next){
        try {
            let dataBody =  req.body
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

    static loginGoogle(req,res,next) {
        let { google_access_token } = req.body
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let email = null;
        client.verifyIdToken({
            idToken: google_access_token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            let payload = ticket.getPayload();
            email = payload.email
            return User.findOne({
                where:{
                    email: payload.email
                }
            })

        })
        .then(user => {
            if(user) {
                return user;

            } else {
                let newUser = {
                    email: email,
                    password: 'randomaja',
                }
                return User.create(newUser)
            }
        })
        .then(dataUser =>{
            let access_token =  JWTTokenUser.tokenUser({
                id: dataUser.id,
                email: dataUser.email,
            })
            return res.status(200).json({ access_token })
        })
        .catch(err => {
            console.log(err);
            next(err)
        })

    }
}


module.exports = UserController