const { User } = require('../models')
const { hashedPassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

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
            } else if (!hashedPassword(payload.password, user.password)) { //compare password fail
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

}

module.exports = UserController;