const { Todo } = require('../models')

class Controller {
    static async addToDo(req, res) {
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
            if(err.name == 'SequelizeValidationError') {
                res.status(400).json(err.errors[0].message)
            } else {
                res.status(500).json(err.errors[0].message)
            }
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
            res.status(500).json(err)
        }
    }

    static async showTodoById(req, res) {
        try {
            const id = +req.params.id
            const toDO = await Todo.findByPk(id)
            if(!toDO) {
                res.status(404).json({ error: 'Data not found' })
            } else {
                res.status(200).json(toDO)
            }
        } catch(err) {
            res.status(500).json(err)
        }
    }

    static async updateTodoById(req, res) {
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
                res.status(404).json({ error: 'Data not found' })
            } else {
                res.status(200).json(toDo[1][0])
            }
        } catch(err) {
            if(err.name == 'SequelizeValidationError') {
                res.status(400).json(err)
            } else {
                res.status(500).json(err)
            }
        }
    }

    static async updateStatusById(req, res) {
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
                res.status(404).json({ error: 'Data not found' })
            } else {
                res.status(200).json(toDo[1][0])
            }
        } catch(err) {
            if(err.name == 'SequelizeValidationError') {
                res.status(400).json(err)
            } else {
                res.status(500).json(err)
            }
        }
    }

    static async deleteTodo(req, res) {
        try{
            const id = Number(req.params.id)
            const toDo = await Todo.destroy({
                where: {
                    id: id
                }
            })
            if(toDo == 0) {
                res.status(404).json({ error: 'Data not found' })
            } else {
                res.status(200).json({ message: 'To do success delete' })
            }
        } catch(err) {
            res.status(500).json({error: 'Internal Server Error' })
        }
    }
}
module.exports = Controller