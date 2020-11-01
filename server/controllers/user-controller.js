const { User } = require('../models')
const { verifyPassword } = require('../helpers/bcrypt')
const { jwtSign } = require('../helpers/jwt')
const axios = require('axios').default

// * Google Oauth
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.PRIVATE_GOOGLE_CLIENT_ID);

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

    static async githubLogin(req, res, next) {
        try {
            const requestToken = req.query.code
            const getAccessToken = await axios({
                method: 'POST',
                url: `${process.env.PRIVATE_GITHUB_URL}?code=${requestToken}&client_id=${process.env.PRIVATE_GITHUB_CLIENT_ID}&client_secret=${process.env.PRIVATE_GITHUB_CLIENT_SECRET}`
            })
            
            const github_access_token = getAccessToken.data.substring(getAccessToken.data.indexOf('=') + 1, getAccessToken.data.indexOf('&'))
            
            const githubUser = await axios({
                method: 'GET',
                url: process.env.PRIVATE_GITHUB_API_URL,
                headers: {
                    Authorization: `token ${github_access_token}`
                }
            })
            const email = githubUser.data.email || `${githubUser.data.id}_fancytodo@github.com`
            const password = githubUser.data.node_id.substring(0, 15)

            const user = await User.findOne({ where: { email } })
            if (user) {
                const verify = verifyPassword(password, user.password)
                if (verify) {
                    const payload = { id: user.id, email }
                    const access_token = jwtSign(payload)

                    res.status(200).json({ access_token, email })
                } else {
                    throw { name: 'Login via github gagal' }
                }
            } else {
                const newGithubUser = {
                    email,
                    password
                }
                const newUser = await User.create(newGithubUser)
                const payload = { id: newUser.id, email: newUser.email }
                const access_token = jwtSign(payload)

                res.status(200).json({ access_token, email })
            }
        } catch (error) {
            next(error)
        }
    }

    static async googleLogin(req, res, next) {
        try {
            const { id_token } = req.body
            const ticket = await client.verifyIdToken({
                idToken: id_token,
                audience: process.env.PRIVATE_GOOGLE_CLIENT_ID
            });
            const payload = ticket.getPayload();
            const email = payload.email
            const password = payload.sub.substring(0, 15)

            const user = await User.findOne({ where: { email }})
            if (user) {
                const verify = verifyPassword(password, user.password)
                if (verify) {
                    const payload = { id: user.id, email: user.email }
                    const access_token = jwtSign(payload)

                    res.status(200).json({ access_token, email })
                } else {
                    throw { name: 'Login via google gagal' }
                }
            } else {
                const newGoogleUser = {
                    email,
                    password
                }
                const newUser = await User.create(newGoogleUser)
                
                const payload = { id: newUser.id, email: newUser.email }
                const access_token = jwtSign(payload)

                res.status(200).json({ access_token, email })
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController