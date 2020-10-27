const {Todo} = require('../models')

const authorization = async (req, res, next)=>{
    try {
        let dataTodo = await Todo.findOne({
            where: {
                id: +req.params.id
            }
        })
        if(dataTodo.UserId===req.key.id){
            next()
        }else{
            throw({msg: 'Unauthorized', status: 401})
        }
    } catch (error) {
        res.status(400).json(error)
    }
   
} 

module.exports = authorization