const { Todo } = require('../models')

class TodoController {

    static async addTodo(req, res) {
        try {
            const newTodo = req.body
            const create = await Todo.create(newTodo)
            res.status(201).json(create.dataValues)
        } catch (error) {
            const err = []
            error.errors.forEach(element => {
                err.push(element.message)
            });
            if (typeof error.errors[0].message == 'string') {
                res.status(400).json({ error: err.join(',') })
            } else {
                res.status(500).json(error)
            }
        }
    }

    static async showAllTodoList(req, res) {
        try {
            const showAll = await Todo.findAll()
            res.status(201).json(showAll)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async getTodoById(req, res) {
        try {
            const id = +req.params.id
            const showById = await Todo.findByPk(id)
            res.status(200).json(showById)
        } catch (error) {
            res.status(404).json(error)
        }
    }

    static async putTodo(req, res) {
        try {
            const id = +req.params.id
            const updatedTodo = req.body
            const updateTodo = await Todo.update(updatedTodo, {
                where: {
                    id
                },
                returning: true
            })
            res.status(200).json(updateTodo[1][0])
        } catch (error) {
            res.status(400).json({ error: error.errors[0].message })
        }
    }

    static async patchTodo(req, res) {
        try {
            const id = +req.params.id
            const status = req.body.status
            const updateTodo = await Todo.update({
                status
            }, {
                where: {
                    id
                },
                returning: true
            })
            if (!updateTodo[0]){
                res.status(404).json({ error: 'Todo not found' })
            } else {
                res.status(200).json(updateTodo[1][0])
            }
        } catch (error) {
            if (error.errors[0].message === undefined) {
                res.status(500).json({ error: "500 Internal Server Error" })
            } else {
                res.status(400).json({ error: error.errors[0].message })
            }
        }
    }

    static async deleteTodo(req, res) {
        try {
            const id = +req.params.id
            const deleteTodo = await Todo.destroy({
                where: {
                    id
                }
            })
            console.log(deleteTodo)
            if (deleteTodo) {
                res.status(200).json({ message: 'todo success to delete' })
            } else {
                res.status(404).json({ error: 'todo not found' })
            }
        } catch (error) {
            res.status(500).json({ error: '500 Internal Server Error'})
        }
    }
}

module.exports = TodoController