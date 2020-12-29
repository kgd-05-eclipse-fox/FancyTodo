const bcrypt = require('bcryptjs')

function hashedPassword(password) {
    const salt = bcrypt.genSaltSync(Number(process.env.SALT))
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

function comparePassword(password, hashPassword) {
    const result = bcrypt.compareSync(password, hashPassword)
    return result
}

module.exports = {
    hashedPassword,
    comparePassword
}