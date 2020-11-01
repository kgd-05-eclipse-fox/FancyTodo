const { Todo } = require('../models/')

async function authorization (req, res, next) {
    try {
        const whoIsLoggedIn = req.whoIsLoggedIn
        const todoId = +req.params.id
    
        const wantedPost = await Todo.findByPk(todoId)
        if (wantedPost) {
            const auth = wantedPost.UserId == whoIsLoggedIn.id
            
            if (auth) {
                next()
            } else {
                throw { name: 'Unauthorized'}
            }
        } else {
            throw { name: "Todo doesn't exist" }
        }
    } catch (error) {
        next(error)
    }

}

module.exports = authorization