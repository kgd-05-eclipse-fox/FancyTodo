const { Todo } = require('../models/index')

async function authorization(req, res, next) {
 const {id} = req.params
 Todo 
 .findByPk(id)
 .then(data => {
     if(!data) {
         throw {msg :'Todo not found', status : 404}
     }
     else if (data.UserId === req.loggedIn.id){
         next()
     }
     else{
         throw {msg : 'Not authorized', status : 401}
     } 
 })
 .catch(err => {
     next(err)
 })
}

module.exports = authorization
