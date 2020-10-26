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
}
module.exports = Controller