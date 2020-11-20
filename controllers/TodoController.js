const axios = require('axios')
const {Todo} = require('../models')

class TodoController {

    static async findAll(req, res) {
        try {
            const todos = await Todo.findAll({where : {
                UserId : req.loggedIn.id
            }})
            res.status(200).json(todos)
        } catch(error){
            res.status(500).json(error)
        }
    }

    static async addTodos(req, res){
        try {
            const {title, description, due_date, status} = req.body
            const newTodo = await Todo.create({
                    title, description, due_date, status, UserId : req.loggedIn.id
            })
            res.status(201).json(newTodo)

        }
        catch (error){
                if(error.name === "SequelizeValidationError"){
                    res.status(400).json({error : error.errors[0].message})
                }else {
                res.status(500).json(error)
                }
            }
        }

    static async getTodos(req, res){
        try {
            const id = req.params.id
            const getodo = await Todo.findOne({
                where : {
                    UserId : req.loggedIn.id,
                    id : id
                }
            })
            if(getodo.UserId === req.loggedIn.id){
                if(!getodo){
                    throw 'error not found'
                }
                res.status(200).json(getodo)
            }else {
                res.status(401).json('not authorized')
            }
        }
        catch (error){
            res.status(404).json({error : error})
        }
    }

    static async updateTodo(req, res){
        try {
        const id = req.params.id
        const {title, description, status, due_date} = req.body

        const todo = await Todo.findByPk(id)
        if(!todo){
            throw {name : "errorlaen"}
        }
        const update = await Todo.update({
                title, description, status, due_date
            },
            { where : {id},
            returning : true
        })
            res.status(200).json(update[1][0])
        }
        catch (error){
            if(error.name === "SequelizeValidationError"){
                res.status(400).json({error : error.errors[0].type})
            }else if (error.name === "errorlaen"){
                res.status(404).json(error)
            }

        }
    }

    static async editTodo(req, res){
        try {
            const id = req.params.id
            const {status} = req.body
            const todo = await Todo.findByPk(id)

            if(!todo){
                throw {name : "not found"}
            }

            const patch = await Todo.update({
                status
            },
            {where : {id},
            returning : true
            })
            res.status(200).json(patch[1][0])
        }
        catch(error){
            if(error.name === "SequelizeValidationError"){
                res.status(400).json({error : 'validation error'})
            }else if (error.name === "not found"){
                res.status(404).json({error : error.name})
            }else {
                res.status(500).json({error})
            }
        }   
    }

    static async destroyTodo(req, res){
        try {
            const id = req.params.id
            const todoId = await Todo.findByPk(id)
            if(!todoId){
                throw {error}
            }
            const todo = await Todo.destroy({
                where : {id}
            })
            res.status(200).json({message : 'deleted success'})
        }
        catch(error){
            res.status(404).json({error : 'not found' })
        }
    }
}

module.exports = TodoController