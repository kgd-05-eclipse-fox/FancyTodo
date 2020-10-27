const bcrypt = require('bcryptjs')

function hashPassword (password) {
   console.log(process.env.SALT);
   console.log(password);
   const salt = bcrypt.genSaltSync(Number(process.env.SALT));
   const hash = bcrypt.hashSync(password, salt);
   return hash
}

function comparePassword (password, hash) {
   return bcrypt.compareSync(password, hash)
}

module.exports = {
   hashPassword,
   comparePassword
}