const { Todo } = require('../models')

const authorization = async (req, res, next) => {
   const id = +req.params.id
   try {
      const findId = await Todo.findByPk(id)
      if (!findId) {
         throw { msg: 'Todo not found', status: 404 }
      } else if (findId.UserId != req.loggedInUser.id) {
         throw { msg: 'Not Authorized', status: 401 }
      } else {
         next()
      }
   } catch (error) {
      next(error)
   }
}

module.exports = authorization