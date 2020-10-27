class Super {

    static validasiPutTodo(data){
        let dataEror = []
        for(let i in data){
            if(!data[i]){
                dataEror.push(`${i} Tidak boleh kosong`)
            }
        }
        
        return dataEror
    }

    static validasiRegister(data){
        let email = data.email
        let pass = data.password

        let dataEror = []

        let validetEmail = 0
        for(let i=0; i<email.length; i++){
            if(email[i]=== '@'){
                validetEmail += 1
            }
        }
        if(validetEmail===0){
            dataEror.push('E-mail tidak valid')
        }
        if(!pass){
            dataEror.push('Password tidak valid')
        }

        return dataEror
    }

    static validasiLoginUser(dataBase, dataLogin){
        let validasiData = 0
        dataBase.forEach(el=>{
            let dataEmail = el.dataValues.email
            let dataPass = el.dataValues.password
            if(dataEmail === dataLogin.email){
                validasiData += 1
            }
            if(dataPass === dataLogin.password){
                validasiData += 1
            }
        })
        let error = []
        if(validasiData !== 2){
            error.push('Email atau Password Anda salah')
        }

        return error
    }

}

/**
 * { id: 1,
  email: 'jajang@gmail.com',
  password: 'jajajaja',
  createdAt: 2020-10-27T04:28:48.068Z,
  updatedAt: 2020-10-27T04:28:48.068Z }
{ id: 2,
  email: 'aabrarnaim24@gmail.com',
  password: 'abrarnaim',
  createdAt: 2020-10-27T04:57:08.371Z,
  updatedAt: 2020-10-27T04:57:08.371Z }

 */


module.exports = Super