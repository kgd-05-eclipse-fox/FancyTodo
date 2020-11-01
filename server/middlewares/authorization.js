const { Todo } = require('../models')

const authorization = async (req, res, next) => {
   const id = +req.params.id
   try {
      const findId = await Todo.findByPk(id)
      if (!findId) {
         throw { msg: 'Todo not found', status: 404 }
      } else if (findId.UserId === req.loggedInUser.id) {
         next()
      } else {
         throw { msg: 'Not Authorized bro', status: 401 }
      }
   } catch (error) {
      next(error)  
   }
}

module.exports = authorization