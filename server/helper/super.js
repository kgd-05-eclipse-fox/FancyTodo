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

}

/**
 * { title: 'Bermain',
    description: 'Game',
    status: 'not done',
    dueDate: '2020-10-26 17:49:49.365+07' } 

 */

module.exports = Super