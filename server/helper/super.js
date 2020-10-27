const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

class Super {

    static validasiPutTodo(data){
        let dataEror = []
        for(let i in data){
            if(i !== 'status'){
                if(!data[i]){
                    dataEror.push(`${i} Tidak boleh kosong`)
                }
            }
        }
        
        return dataEror
    }

    static validasiRegister(data){
        const salt = bcrypt.genSaltSync(+process.env.SALT);
        const hash = bcrypt.hashSync(data, salt);
        
        return {
            password: hash
        }
    }

    static validasiLoginUser(passLogin, passDB){
        return bcrypt.compareSync(passLogin, passDB)
    }

    static tokenUser(data){
        const token = jwt.sign(data, process.env.RAHASIA)
        return token
    }

}

module.exports = Super