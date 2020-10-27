const { User } = require('../models')
const { hashedPassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class UserController {
    static register(req,res) {
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
            res.status(500).json(err)
        });

    }

    static login(req,res) {
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
                res.status(401).json({
                    message:"invalid email/password"})
            } else if (!hashedPassword(payload.password, user.password)) { //compare password fail
                res.status(401).json({
                    message:"invalid email/password"})
            } else {
                const access_token = signToken({
                    email: user.email
                })
                res.status(201).json({
                    access_token
                })
            }
        }).catch((err) => {
            res.status(500).json(err)
        });
        
    }

}

module.exports = UserController;