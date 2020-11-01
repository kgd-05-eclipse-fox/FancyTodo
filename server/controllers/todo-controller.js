const { Todo } = require('../models')


class Controller {
    static postTodo (req,res, next) {
        const userId = req.loggedInUser.id

        const value = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            UserId: userId
        }

        Todo
            .create(value)
            .then((todo) => {
                res.status(201).json(todo)
            }).catch((err) => {
                next(err)
            });
    }

    static findAll(req,res,next) {
        const userId = req.loggedInUser.id

        Todo
            .findAll({
                where: {
                    UserId: userId
                }
            })
            .then((todo) => {
                res.status(200).json(todo)
            }).catch((err) => {
                next(err)
            });
    }

    static getById(req,res,next) {
        const id = +req.params.id
        Todo
            .findByPk(id)
            .then(todo => {
                res.status(200).json(todo);
            })
            .catch(err => {
                next(err)//msh dicari cara uji error
            })
    }

    static putEditTodo(req,res,next) {
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
                next(err)
            });
    }

    static patchIdTodo(req,res,next) {
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
                    next(err)
                });
    }

    static deleteById(req,res, next) {
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
                next(err)
            });
    }
}


module.exports = Controller;