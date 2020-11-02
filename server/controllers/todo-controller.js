const { Todo } = require('../models')

class TodoController {
   static async getTodoHandler (req, res, next) {
      try { 
         const UserId = req.loggedInUser.id
         const todos = await Todo.findAll({
            where: {
               UserId: UserId
            }
         })
         res.status(200).json({todos})
      } catch (err) {
         next(err)
      }
   }

   static async createTodoHandler (req, res, next) {
      try {
         const newTodo = await Todo.create({
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            UserId: req.loggedInUser.id
         })
         res.status(201).json(newTodo)
      } catch (err) {
         next(err)
      }
   }

   static async getTodoByIdHandler (req, res, next) {
      try {
         const id = +req.params.id
         const todo = await Todo.findByPk(id)

         if (todo) {
            res.status(200).json(todo)
         } else {
            res.status(404).json({message: `id with ${id} not found `})
         }
      } catch (error) {
         next(error)
      }
   }

   static async updateTodoHandler (req, res, next) {
      try {
         const { title, description, due_date } = req.body
         const update = await Todo.update({
            title,
            description,
            due_date
         }, {
            where: {
               id: +req.params.id
            },
            returning: true
         })
         res.status(200).json(update[1][0])
      } catch (error) {
         next(error)
      }
   }

   static async patchTodoHandler (req, res, next) {
      try {
         let id = +req.params.id
         const updated = await Todo.update({
            status: 'complete'
         },{
            where: {
               id: id
            },
            returning: true
         })

         if (updated[0] !== 1) {
            res.status(404).json({message: `todo with id ${id} is not found`})
         } else {
            res.status(200).json(updated[1][0])
         }
      } catch (error) {
         next(error)
      }
   }

   static async deleteTodoHandler (req, res, next) {
      try {
         const id = +req.params.id
         const destroy = await Todo.destroy({
            where : {
               id: id
            },
         }, {
            returning: true
         })
         if (destroy !== 1) {
            res.status(404).json({message: `error not found`})
        } else {
            res.status(200).json({message: `todo success to delete`})
        }
      } catch (error) {
         next(error)
      }
   }
}

module.exports = TodoController