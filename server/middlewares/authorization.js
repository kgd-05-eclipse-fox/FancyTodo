const { Todo } = require('../models/')

async function authorization (req, res, next) {
    const whoIsLoggedIn = req.whoIsLoggedIn
    const todoId = +req.params.id

    const wantedPost = await Todo.findByPk(todoId)
    if (wantedPost) {
        const auth = wantedPost.UserId == whoIsLoggedIn.id
        
        if (auth) {
            next()
        } else {
            res.status(401).json({ error: 'Unauthorized'})
        }
    } else {
        res.status(404).json({ error: "Todo doesn't exist" })
    }

}

module.exports = authorization