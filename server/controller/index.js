const { Todo } = require('../models')

class TodoController {

    static async addTodo(req, res) {
        try {
            const newTodo = req.body
            const create = await Todo.create(newTodo)
            res.status(201).json(create.dataValues)
        } catch (error) {
            if (error.errors[0].message === "Date must be greater than present") {
                res.status(400).json({ error: error.errors[0].message })
            } else {
                res.status(500).json(error)
            }
        }
    }
}

module.exports = TodoController