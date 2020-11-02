const { User } = require('../models');
const { comparedPassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const {OAuth2Client} = require('google-auth-library');


class UserController {
    static register(req,res,next) {
        const value = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(value)
        .then((user) => {
            res.status(201).json({
                id: user.id,
                email: user.email
            })
        }).catch((err) => {
            next(err)
        });

    }

    static login(req,res, next) {
        const payload = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({
            where: {
                email: payload.email
            }
        })
        .then((user) => {
            if (!user) { //if user is not found
                throw {msg: "invalid email/password", status: 401}
            } else if (!comparedPassword(payload.password, user.password)) { //compare password fail
                throw {msg: "invalid email/password", status: 401}
            } else {
                const access_token = signToken({
                    id: user.id,
                    email: user.email
                })
                res.status(201).json({
                    access_token
                })
            }
        }).catch((err) => {
            next(err)
        });
        
    }
    
    static googleLogin(req,res,next) {
        //verify access token
        //dapetin token dari client
        let { google_access_token } = req.body
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let email = null;
        //verify google token berdasarkan client id
        //kembalikan token google seperti token biasa agar dapat di autentikasi server
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
                    password: 'randomaja'
                }
                return User.create(newUser)
            }
        })
        .then(dataUser =>{
            let access_token =  signToken({
                id: dataUser.id,
                email: dataUser.email
            })
            return res.status(200).json({   })
        })
        .catch(err => {
            console.log(err);
        })

    }

}

module.exports = UserController;