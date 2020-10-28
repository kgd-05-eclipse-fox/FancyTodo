
class ValidasiUser{

    static validasiPutTodo(data){
        let dataEror = ''
        for(let i in data){
            if(i !== 'status'){
                if(!data[i]){
                    let output = `${i} Tidak boleh kosong - `
                    dataEror += output
                }
            }
        }
        
        return dataEror
    }

    static validasiRegister(data){
        const salt = bcrypt.genSaltSync(+process.env.SALT);
        const hash = bcrypt.hashSync(data, salt);
        
        return { password: hash }
    }
    
}

module.exports = ValidasiUser