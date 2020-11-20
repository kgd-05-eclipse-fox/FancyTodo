const { Todo } = require('../models/')

async function authorization(req, res, next) {
    const todoId = +req.params.id
    // console.log(req.loginUser)
    try {
        const todo = await Todo.findByPk(todoId)
        // console.log(todo)
        if(todo == null) {
            throw { msg: "Data not found", status: 404 }
        } else {
            if(todo.UserId == req.loginUser.id) {
                next()
            } else {
                throw { msg: "Not authorized to delete this post", status: 404 }
            }
        }
    } catch (error) {
        res.status(error.status).json(error.msg)
    }
}

module.exports = authorization