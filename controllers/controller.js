const { Todo } = require('../models')

class Controller {
    static findAll(req,res) {
        Todo
            .findAll()
            .then((todo) => {
                res.status(200).json(todo)
            }).catch((err) => {
                res.status(500).json(err)
            });
    }
    static editAll(req,res) {
        const id = +req.params.id
        const {title, description, status,due_data} = req.body
        console.log(req.body);
        Todo
            .update({
                title,
                description,
                status
            },
            {
                where: {
                    id
                },
                returning:true
            })
            .then((update) => {
                res.status(200).json(update[1][0])
            }).catch((err) => {
                res.status(500).json(err)
            });
    }
}


module.exports = Controller;