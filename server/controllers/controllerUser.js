const { User } = require('../models')
const { comparePassword } = require('../helper/bcrypt.js')
const jwt = require('jsonwebtoken')

class Controller {
    static async saveNewUser(req, res) {
        try {
            const payload = { email: req.body.email, password: req.body.password }
            const user = await User.create(payload)
            res.status(201).json(user)
        } catch (error) {
            res.status(500).json(err)
        }
    }

    static async loginUser(req, res) {
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
                    const httpCode = 404
                    const message = 'Wrong username / password'
                    res.status(httpCode).json({ msg: message})
                } else {
                    const payload = { id: user.id, email: user.email }
                    const token = jwt.sign(payload, 'secret')
                    const httpCode = 200
                    res.status(httpCode).json({ acess_token: token})
                }
            } else {
                const errCode = 404
                const message = 'Wrong username / password'
                res.status(errCode).json({ msg: message})
            }
        } catch (error) {
            res.status(500).json(err)
        }
    }
}

module.exports = Controller