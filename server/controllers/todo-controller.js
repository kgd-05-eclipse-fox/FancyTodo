const { Todo } = require('../models')
const convertPayload = require('../helpers/convertPayload')

class Controller {

    // * Create Todo
    static async postAddNewTodo(req, res) {
        try {
            const newTodo = convertPayload(req.body)
            const addNewTodo = await Todo.create(newTodo)
            res.status(201).json(addNewTodo)
        } catch (err) {
            const error = err.errors[0].message
            if (error == 'Cannot Create or Update Todo') {
                res.status(400).json({ error: error })
            } else {
                res.status(500).json({ error: 'Internal Server Error' })
            }
        }
    }

    // * Show All Todos
    static async getAllTodos(req, res) {
        try {
            const todos = await Todo.findAll()
            res.status(200).json(todos)
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error" })
        }
    }

    // * Show One Todo
    static async getTodoById(req, res) {
        try {
            const id = +req.params.id
            const todo = await Todo.findByPk(id)
            if (todo) {
                res.status(200).json(todo)
            } else {
                res.status(404).json({ error: "Todo doesn't exist" })
            }
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error" })
        }
    }

    // * Update Todo
    static async putUpdateTodo(req, res) {
        try {
            const id = +req.params.id
            const payload = convertPayload(req.body)
            const updateTodo = await Todo.update(payload, { where: { id }, returning: true })
            if (!updateTodo[0]) {
                res.status(404).json({ error: 'Todo Not Found'})
            } else {
                res.status(200).json(updateTodo[1][0])
            }
        } catch (err) {
            const error = err.errors[0].message
            if (error == 'Cannot Create or Update Todo') {
                res.status(400).json({ error: error })
            } else {
                res.status(500).json({ error: "Internal Server Error" })
            }
        }
    }

    // * Update Todo Status
    static async patchTodoStatus(req, res) {
        try {
            const id = +req.params.id
            const status = req.body.status
            const patched = await Todo.update({ status }, { where: { id }, returning: true })
            if (!patched[0]) {
                res.status(404).json({ error: 'Todo Not Found'})
            } else {
                res.status(200).json(patched[1][0])
            }
        } catch (err) {
            const error = err.errors[0].message
            if (error == 'Cannot Create or Update Todo') {
                res.status(400).json({ error: error })
            } else {
                res.status(500).json({ error: "Internal Server Error" })
            }
        }
    }

    // * Delete Todo
    static async deleteTodoById(req, res) {
        try {
            const id = +req.params.id
            const del = await Todo.destroy({ where: { id }})
            if (!del) {
                res.status(404).json({ error: 'Todo Not Found' })
            } else {
                res.status(200).json({ message: 'todo success to delete' })
            }
        } catch (err) {
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}

module.exports = Controller