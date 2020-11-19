const { Todo } = require('../models')

class Controller {
    static async addToDo(req, res, next) {
        const userId = req.loginUser.id
        try {
            const payload = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date,
                UserId: userId
            }
            const toDo = await Todo.create(payload)
            res.status(201).json(toDo)
        } catch(err) {
            next(err)
        }
    }

    static async showListTodos(req, res) {
        const userId = req.loginUser.id
        try {
            const toDo = await Todo.findAll({
                where: {
                    UserId: userId
                }
            })
            res.status(200).json(toDo)
        } catch(err) {
            next(err)
        }
    }

    static async showTodoById(req, res, next) {
        try {
            const id = +req.params.id
            const toDO = await Todo.findByPk(id)
            if(!toDO) {
                throw { name: 'Not Found' }
            } else {
                res.status(200).json(toDO)
            }
        } catch(err) {
            // console.log(err)
            next(err)
        }
    }

    static async updateTodoById(req, res, next) {
        try {
            const id = Number(req.params.id)
            const payload = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date
            }
            const toDo = await Todo.update(payload, {
                where: {
                    id: id
                },
                returning: true
            })
            if(toDo[0] == 0) {
                throw { name: "Not Found" }
            } else {
                res.status(200).json(toDo[1][0])
            }
        } catch(err) {
            next(err)
        }
    }

    static async updateStatusById(req, res, next) {
        try {
            const id = Number(req.params.id)
            const payload = { status: req.body.status }
            const toDo = await Todo.update(payload, {
                where: {
                    id: id
                },
                returning: true
            })
            if(toDo[0] == 0) {
                throw { name: "Not Found" }
            } else {
                res.status(200).json(toDo[1][0])
            }
        } catch(err) {
            next(err)
        }
    }

    static async deleteTodo(req, res, next) {
        try{
            const id = Number(req.params.id)
            const toDo = await Todo.destroy({
                where: {
                    id: id
                }
            })
            if(toDo == 0) {
                throw { name: "Not Found" }
            } else {
                res.status(200).json({ message: 'To do success delete' })
            }
        } catch(err) {
            next(err)
        }
    }
}
module.exports = Controller