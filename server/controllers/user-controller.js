const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt.js')
const { signToken } = require('../helpers/jwt.js')

class UserController {
   static async registerUserHandler (req, res) {
      try {
         const newUser = await User.create({
            email: req.body.email,
            password: req.body.password
         })
         res.status(201).json({
            id: newUser.id,
            email: newUser.email
         })
      } catch (error) {
         res.status(400).json(error)
      }
   }

   static async loginUserHandler (req, res) {
      try {
         const { email, password } = req.body
         const user = await User.findOne({
            where: {
               email: email
            }
         })

         if (!user) {
            res.status(201).json({
               message: 'Wrong email or password'
            })
         } else if (!comparePassword(password, user.password)) {
            res.status(401).json({
               message: 'Wrong email or password'
            })
         } else {
            const access_token = signToken({
               id: user.id,
               email: user.email
            })

            res.status(200).json({
               access_token
            })
         }
      } catch (error) {
         res.status(400).json(error)
      }
   }
}

module.exports = UserController