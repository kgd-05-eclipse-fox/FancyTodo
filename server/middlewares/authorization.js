const { Todo } = require('../models')

async function authorization(req, res, next) {
    try {
        const { id } = req.params
        const find = await Todo.findByPk(+id)
            if (!find) {
                throw { msg: 'Todo not found', status: 404}
            } else if (find.UserId === req.loggedInUser.id) {
                next()
            } else {
                throw { msg: 'Not authorized', status: 401}
            }
        
    } catch (err) {
        const status = err.status || 500
        const msg = err.msg || 'Internal Server Error'
        res.status(status).json({ error: msg})
    }

}

module.exports = { authorization }