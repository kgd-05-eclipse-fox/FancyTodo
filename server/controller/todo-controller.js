const { Todo } = require('../models')

class TodoController {

    static async addTodo(req, res, next) {
        console.log(req.loggedInUser)
        const UserId = req.loggedInUser.id
        try {
            const payLoad = {
                title: req.body.title,
                description: req.body.description,
                due_date: req.body.due_date,
                UserId
            }
            const create = await Todo.create(payLoad)
            res.status(201).json(create.dataValues)
        } catch (error) {
            next(error)
        }
    }

    static async showAllTodoList(req, res, next) {
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
            next(error)
        }
    }

    static async getTodoById(req, res, next) {
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
            next(error)
        }
    }

    static async putTodo(req, res, next) {
        try {
            const id = +req.params.id
            const UserId = req.loggedInUser.id
            const payLoad = {
                title: req.body.title,
                description: req.body.description
            }
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
            next(error)
        }
    }

    static async patchTodo(req, res, next) {
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
            next(error)
        }
    }

    static async deleteTodo(req, res, next) {
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
            next(error)
        }
    }
}

module.exports = TodoController