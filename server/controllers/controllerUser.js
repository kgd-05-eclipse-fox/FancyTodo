const { User } = require('../models')
const { comparePassword } = require('../helper/bcrypt.js')
const { getToken } = require('../helper/jwt.js')
const {OAuth2Client} = require('google-auth-library')

class Controller {
    static async saveNewUser(req, res, next) {
        try {
            const payload = { email: req.body.email, password: req.body.password }
            const data = await User.create(payload)
            res.status(201).json({ id: data.id, email: data.email })
        } catch (err) {
            next(err)
        }
    }

    static async loginUser(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if(user) {
                let hashPassword = user.password
                let result = comparePassword(password, hashPassword)
                if(!result) {
                    throw { name: "Wrong Data" }
                } else {
                    const payload = { id: user.id, email: user.email }
                    const token = getToken(payload)
                    const httpCode = 200
                    res.status(httpCode).json({ access_token: token})
                }
            } else {
                throw { name: "Wrong Data" }
            }
        } catch (error) {
            next(error)
        }
    }

    static loginGoogle(req, res, next) {
        let google_token = req.body.token
        // console.log(google_token)
        const client = new OAuth2Client(process.env.CLIENT_ID)
        let email
        client.verifyIdToken({
            idToken: google_token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            let payload = ticket.getPayload()
            email = payload.email
            return User.findOne({
                where: {
                    email: payload.email
                }
            })
        })
        .then(user => {
            if(user !== null) {
                return user
            } else {
                let newUser = {
                    email,
                    password: "hanfarhan22"
                }
                return User.create(newUser)
            }
        })
        .then(data => {
            let payload = { id: data.id, email: data.email }
            let token = getToken(payload)
            res.status(200).json({ access_token: token})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = Controller