const { Todo } = require('../models')

class Controller {
    static postTodo (req,res) {
        const value = {
            title: "Go to market",
            description: "Buy fish and vegetables",
            due_date: "2020-10-27"
        }

        Todo
            .create(value)
            .then((todo) => {
                res.status(201).json(todo)
            }).catch((err) => {
                res.status(500).json({error: err.errors[0]})
            });
    }

    static findAll(req,res) {
        Todo
            .findAll()
            .then((todo) => {
                res.status(200).json(todo)
            }).catch((err) => {
                res.status(500).json(err)
            });
    }

    static putEditTodo(req,res) {
        const id = +req.params.id;
        const {title, description, status, due_date} = req.body

        Todo
            .update({
                title,
                description,
                status,
                due_date
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

    static patchIdTodo(req,res) {
        const id = +req.params.id
        const { status } = req.body;
        
        Todo
            .update({
                    status
                }, 
                {
                    where: {
                        id
                    },
                    returning: true
                })
                .then((todo) => {
                    res.status(200).json(todo[1][0])
                }).catch((err) => {
                    res.status(500).json(err)
                });
    }

    static deleteById(req,res) {
        const id = +req.params.id

        Todo
            .destroy({
                where: {
                    id
                }
            })
            .then((data) => {
                res.status(200).json("message: todo success to delete")
            }).catch((err) => {
                res.status(500).json(err)
            });
    }
}


module.exports = Controller;