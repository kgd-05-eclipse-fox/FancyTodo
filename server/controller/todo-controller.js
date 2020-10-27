const { Todo } = require('../models')

class TodoController {

    static async addTodo(req, res) {
        console.log(req.loggedInUser)
        const UserId = req.loggedInUser.id
        try {
            const newTodo = req.body
            newTodo.UserId = UserId
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
                res.status(500).json({ error: 'Internal Server Error'})
            }
        }
    }

    static async showAllTodoList(req, res) {
        const UserId = req.loggedInUser.id
        try {
            const showAll = await Todo.findAll({
                where: {
                    UserId: UserId
                },
                order: [['due_date', 'DESC']]
            })
            res.status(200).json(showAll)
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }

    static async getTodoById(req, res) {
        try {
            const id = +req.params.id
            const UserId = req.loggedInUser.id
            const showById = await Todo.findOne({
                where: {
                    id,
                    UserId
                }
            })
            if (showById) {
                res.status(200).json(showById)
            } else {
                res.status(404).json({ error: 'Todo not found'})
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error!'})
        }
    }

    static async putTodo(req, res) {
        try {
            const id = +req.params.id
            const UserId = req.loggedInUser.id
            console.log(id)
            const updatedTodo = req.body
            console.log(updatedTodo)
            const updateTodo = await Todo.update(updatedTodo, {
                where: {
                    id,
                    UserId
                },
                returning: true
            })
            if (updateTodo[0]) {
                res.status(200).json(updateTodo[1][0])
            } else {
                res.status(500).json({ error: 'Internal Server Error'})
            }
        } catch (error) {
            console.log(error)
            // res.status(400).json({ error: error.errors[0].message })
        }
    }

    static async patchTodo(req, res) {
        try {
            const id = +req.params.id
            const UserId = req.loggedInUser.id
            const status = req.body.status
            const updateTodo = await Todo.update({
                status
            }, {
                where: {
                    id,
                    UserId
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
                res.status(400).json({ error: 'Should be true or false' })
            }
        }
    }

    static async deleteTodo(req, res) {
        try {
            const id = +req.params.id
            const UserId = req.loggedInUser.id
            const deleteTodo = await Todo.destroy({
                where: {
                    id,
                    UserId
                }
            })
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