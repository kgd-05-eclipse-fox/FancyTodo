const { Todo } = require('../models')

class TodoController {
   static async getTodoHandler (req, res) {
      try { 
         const todos = await Todo.findAll()
         res.status(200).json(todos)
      } catch (error) {
         res.status(500).json(error)
      }
   }

   static async createTodoHandler (req, res) {
      try {
         const newTodo = await Todo.create({
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date
         })

         res.status(201).json(newTodo)
      } catch (error) {
         console.log("TodoController -> createTodoHandler -> error", error)
         if (error.errors) {
            res.status(400).json(error.errors[0].message) 
         } else {
            res.status(500).json(error) 
         }
      }
   }

   static async getTodoByIdHandler (req, res) {
      try {
         const id = +req.params.id
         const todo = await Todo.findByPk(id)

         if (todo) {
            res.status(200).json(todo)
         } else {
            res.status(404).json({message: `id with ${id} not found `})
         }
      } catch (error) {
         res.status(500).json(error)
      }
   }

   static async updateTodoHandler (req, res) {
      try {
         const { title, description, due_date } = req.body
         const id = +req.params.id
         const update = await Todo.update({
            title,
            description,
            due_date
         }, {
            where: {
               id: id
            },
            returning: true
         })
         
         if (update[0] !== 1) {
            res.status(404).json({message: `todo with id ${id} is not found`})
         } else {
            res.status(200).json(update[1][0])
         }
      } catch (error) {
         if (error.errors) {
            res.status(400).json(error.errors[0].message)
        } else {
            res.status(500).json(error)
        }
      }
   }

   static async patchTodoHandler (req, res) {
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
         if (error.errors) {
            res.status(400).json(error.errors[0].message)
         } else {
            res.status(500).json(error)
         }
      }
   }

   static async deleteTodoHandler (req, res) {
      try {
         const id = +req.params.id
         const destroy = await Todo.destroy({
            where : {
               id: id
            },
            returning: true
         })
         if (destroy !== 1) {
            res.status(404).json({message: `error not found`})
        } else {
            res.status(200).json({message: `todo success to delete`})
        }
      } catch (error) {
         res.status(500).json(error)
      }
   }

}

module.exports = TodoController