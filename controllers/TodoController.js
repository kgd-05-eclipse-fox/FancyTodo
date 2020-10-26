const {Todo} = require('../models')

class TodoController {

    static async findAll(req, res) {
        try {
            const todos = await Todo.findAll()
            res.status(200).json(todos)
        } catch(error){
            res.status(500).json(error)
        }
    }

    static async updateTodo(req, res) {
        const {title, description, status, due_date} = req.body
        Todo.update({
            title,
            description,
            status,
            due_date
        }, {
            where : {
                id : req.params.id
            },
            returning : true
        })
        .then(result => {
            if(result[0] === 0){
                throw {
                    name : "updated failed"
            }
        }
            res.status(200).json(result[1][0])
        })
        .catch(err=> {
            res.status(500).json(err)
        })
    }
}

module.exports = TodoController