const {Todo} = require('../models')

const authorization = async (req, res, next)=>{
    try {
        let dataTodo = await Todo.findOne({
            where: {
                id: +req.params.id //+nan
            }
        })
        if(dataTodo.UserId===req.key.id){
            next()
        }else{
            throw({msg: 'Unauthorized', status: 401})
        }
    } catch (err) {
        // let error ={
        //     name: 'suthorization',
        //     status: 400,
        //     msg: 'Unauthorized'
        // }
        next(err)
    }
   
} 

module.exports = authorization