const bcrypt = require('bcrypt');

const hashedPassword = (password) => {
    const salt = bcrypt.genSaltSync(+process.env.SALT);
    const hash = bcrypt.hashSync(password, salt);
    return hash
}


const comparedPassword = (password,hash) => {

    return bcrypt.compareSync(password, hash); // true
}

module.exports = {
    hashedPassword,
    comparedPassword
}





