const bcrypt = require('bcryptjs')

const hashPassword = urPassword => {
    const salt = bcrypt.genSaltSync(+process.env.SALT)
    const hash = bcrypt.hashSync(urPassword, salt)

    return hash
}

const verifyPassword = (urPassword, dbPassword) => {
    return bcrypt.compareSync(urPassword, dbPassword)
}

module.exports = { hashPassword, verifyPassword }