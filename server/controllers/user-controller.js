const { User } = require('../models')
const { verifyPassword } = require('../helpers/bcrypt')
const { jwtSign } = require('../helpers/jwt')

class UserController {
    static async postUserRegister(req, res, next) {
        try {
            const newUser = { email: req.body.email, password: req.body.password }
            const register = await User.create(newUser)
            res.status(201).json({ id: register.id, email: register.email })
        } catch (error) {
            next(error)
        }
    }

    static async postUserLogin(req, res, next) {
        try {
            const email = req.body.email
            const password = req.body.password

            if (!email || !password) throw { name: 'Email atau Password tidak boleh kosong'}

            const user = await User.findOne({ where: { email }})
            
            if (user) {
                const verify = verifyPassword(password, user.password)
                if (verify) {
                    const payload = { id: user.id, email }
                    const access_token = jwtSign(payload)

                    res.status(200).json({ access_token })
                } else {
                    throw { name: 'Email atau Password salah' }
                }
            } else {
                throw { name: 'Email atau Password salah' }
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController