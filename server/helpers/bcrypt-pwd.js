const bcrypt = require('bcrypt')

const hashPassword = password => {
    const salt = bcrypt.genSaltSync(+process.env.SALT)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

const compare = (password, hashedPassword) => {
    const result = bcrypt.compareSync(password, hashedPassword)
    return result
}

module.exports = { hashPassword, compare }