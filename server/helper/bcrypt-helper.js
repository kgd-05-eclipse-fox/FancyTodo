const bcrypt = require('bcryptjs');

class BcryptValidasiUser{

    static validasiRegister(data){
        const salt = bcrypt.genSaltSync(+process.env.SALT);
        const hash = bcrypt.hashSync(data, salt);
        
        return { password: hash }
    }

    static validasiLoginUser(passLogin, passDB){
        return bcrypt.compareSync(passLogin, passDB)
    }

}

module.exports = BcryptValidasiUser