const { Todo } = require('../models')

class Controller {
    static async addToDo(req, res) {
        try {
            const payload = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date
            }
            const toDo = await Todo.create(payload)
            res.status(201).json(toDo)
        } catch(err) {
            if(err.name == 'SequelizeValidationError') {
                res.status(400).json(err)
            } else {
                res.status(500).json(err)
            }
        }
    }

    static async showListTodos(req, res) {
        try {
            const toDo = await Todo.findAll()
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
}
module.exports = Controller