const { Todo } = require('../models');

const authorization = (req, res, next) => {
    const userId =  req.loggedInUser.id;
    const id = +req.params.id;

    Todo.findByPk(id)
    .then(todo => {

        if (!todo) {
            throw  {msg: 'Todo not found', status: 404 }
        } else if (todo.UserId === userId) {
            next()
        } else {
            throw { msg: 'Not authorized', status: 401 }
        }
    }) 
    .catch(err => {
        next(err)
    }) 

}



module.exports = authorization

