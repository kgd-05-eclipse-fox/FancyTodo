const axios = require('axios')
const {
    Todo
} = require('../models')

class TodoController {

    static async findAll(req, res) {
        try {
            const todos = await Todo.findAll({
                where: {
                    UserId: req.loggedIn.id
                }
            })
            res.status(200).json(todos)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async addTodos(req, res, next) {
        try {
            const {
                title,
                description,
                due_date,
                status
            } = req.body
            const newTodo = await Todo.create({
                title,
                description,
                due_date,
                status,
                UserId: req.loggedIn.id
            })
            res.status(201).json(newTodo)

        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async getTodos(req, res, next) {
        try {
            const id = req.params.id
            const getodo = await Todo.findOne({
                where: {
                    UserId: req.loggedIn.id,
                    id: id
                }
            })
            if (getodo.UserId === req.loggedIn.id) {
                if (!getodo) {
                    throw 'error not found'
                }
                res.status(200).json(getodo)
            } else {
                res.status(401).json('not authorized')
            }
        } catch (error) {
            next(error)
        }
    }

    static async updateTodo(req, res, next) {
        try {
            const id = req.params.id
            const {
                title,
                description,
                status,
                due_date
            } = req.body

            const todo = await Todo.findByPk(id)
            if (!todo) {
                throw {
                    name: "not found"
                }
            }
            const update = await Todo.update({
                title,
                description,
                status,
                due_date
            }, {
                where: {
                    id
                },
                returning: true
            })
            res.status(200).json(update[1][0])
        } catch (error) {
            next(error)
        }
    }

    static async editTodo(req, res, next) {
        try {
            const id = req.params.id
            const {
                status
            } = req.body
            const todo = await Todo.findByPk(id)

            if (!todo) {
                throw {
                    name: "not found"
                }
            }

            const patch = await Todo.update({
                status
            }, {
                where: {
                    id
                },
                returning: true
            })
            res.status(200).json(patch[1][0])
        } catch (error) {
            next(error)
        }
    }
    static async destroyTodo(req, res, next) {
        try {
            const id = req.params.id
            const todoId = await Todo.findByPk(id)
            if (!todoId) {
                throw {
                    error
                }
            }
            const todo = await Todo.destroy({
                where: {
                    id
                }
            })
            res.status(200).json({
                message: 'deleted success'
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TodoController