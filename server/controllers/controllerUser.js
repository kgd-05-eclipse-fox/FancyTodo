const { User } = require('../models')
const { comparePassword } = require('../helper/bcrypt.js')
const { getToken } = require('../helper/jwt.js')

class Controller {
    static async saveNewUser(req, res) {
        try {
            const payload = { email: req.body.email, password: req.body.password }
            const data = await User.create(payload)
            res.status(201).json({ id: data.id, email: data.email })
        } catch (err) {
            res.status(400).json(err.errors[0].message)
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
                    const httpCode = 401
                    const message = 'Wrong username / password'
                    res.status(httpCode).json({ msg: message})
                } else {
                    const payload = { id: user.id, email: user.email }
                    const token = getToken(payload)
                    const httpCode = 200
                    res.status(httpCode).json({ acess_token: token})
                }
            } else {
                const errCode = 401
                const message = 'Wrong username / password'
                res.status(errCode).json({ msg: message})
            }
        } catch (error) {
            res.status(500).json(err)
        }
    }
}

module.exports = Controller