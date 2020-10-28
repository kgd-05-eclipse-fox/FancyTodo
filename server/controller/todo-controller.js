const {Todo} = require ('../models')
const Super = require('../helper/super.js')

class TodoController{
    
    static async getTodo(req, res, next){
        try {
            let data = await Todo.findAll({
                where: {UserId: req.key.id}
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async postTodo(req, res, next){
        try {
            let dataInput = req.body
            let validasiError = Super.validasiPutTodo(dataInput)
            if(validasiError.length>0){
                let error ={
                    cek: 'postTodo',
                    status: 400,
                    msg: validasiError,
                }
                throw error
            }else{
                dataInput.UserId = req.key.id
                let data = await Todo.create(dataInput)
                res.status(201).json(data)
            }
        } catch (err) {
            next(err)
        }
    }

    static async getTodoById(req, res, next){
        try {
            let id = +req.params.id
            let data = await Todo.findByPk(id)
            res.status(200).json(data)
        } catch (err) {
           next(err)
        }
    }

    static async putTodo(req, res, next){
        try {
            let id = +req.params.id
            let dataInput = req.body
            
            let validasiError = Super.validasiPutTodo(dataInput)
            if(validasiError.length>0){
                let error ={
                    cek: 'postTodo',
                    status: 400,
                    msg: validasiError,
                }
                throw error   
            }else{
                if(!dataInput.status){
                    dataInput.status = 'not done'
                }
                let data = await Todo.update(dataInput, {
                    where: {id}
                })
                res.status(200).json(dataInput)
            }
        } catch (err) {
            next(err)
        }
    }

    static async patchTodo(req, res, next){
        try {
            let id = +req.params.id
            let dataInput = req.body.status
            let data = Todo.findByPk(id)
            data.status = dataInput
            Todo.update(data, {
                where: {id}
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
   
    static async deleteTodo(req, res, next){
        try {
            console.log('masuk TODO DElete')
            let id = +req.params.id
            let data = await Todo.destroy({
                where: {id}
            })
            if(data===0){
                let error = {
                    key: 'deletToDo',
                    status: 400,
                    msg: 'Id Tidak ditemukan'
                }
                throw error
            }else{
                let output = {
                    massage: 'todo succes to delete'
                }
                res.status(200).json(output)
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = TodoController