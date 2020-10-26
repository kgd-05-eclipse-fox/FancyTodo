const { User } = require('../models')
const { verifyPassword } = require('../helpers/bcrypt-superman')

const jwt = require('jsonwebtoken')

class UserController {
    static async postUserRegister(req, res) {
        try {
            const newUser = { email: req.body.email, password: req.body.password }
            const register = await User.create(newUser)
            res.status(201).json({ id: register.id, email: register.email })
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }

    static async postUserLogin(req, res) {
        try {
            const email = req.body.email
            const password = req.body.password

            const user = await User.findOne({ where: { email }})
            
            if (user) {
                const verify = verifyPassword(password, user.password)
                if (verify) {
                    const payload = { id: user.id, email }
                    const access_token = jwt.sign(payload, process.env.PRIVATE_KEYSHA256)

                    res.status(200).json({ access_token })
                } else {
                    res.status(401).json({ error: 'User not found' })
                }
            } else {
                res.status(401).json({ error: 'User not found' })
            }
        } catch (error) {
            
        }
    }
}

module.exports = UserController