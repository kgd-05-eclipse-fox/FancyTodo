const { Todo } = require('../models')
const convertPayload = require('../helpers/convertPayload')
const checkWeatherByUserLocation = require('../helpers/get-weather')

class Controller {

    // * Create Todo
    static async postAddNewTodo(req, res, next) {
        try {
            const whoIsLoggedIn = req.whoIsLoggedIn

            const newTodo = convertPayload(req.body)
            newTodo.UserId = whoIsLoggedIn.id

            const addNewTodo = await Todo.create(newTodo)
            res.status(201).json(addNewTodo)
        } catch (err) {
            next(err)
        }
    }

    // * Show All Todos
    static async getAllTodos(req, res, next) {
        try {
            const whoIsLoggedIn = req.whoIsLoggedIn
            const userlocation = req.userLocation

            const todos = await Todo.findAll({ where: { UserId: whoIsLoggedIn.id }})
            const todayWeather = await checkWeatherByUserLocation(userlocation)

            res.status(200).json({ todos, todayWeather }) // * Returns All Todos + Today Weather ^^
        } catch (err) {
            next(err)
        }
    }

    // * Show One Todo
    static async getTodoById(req, res, next) {
        try {
            const id = +req.params.id
            const todo = await Todo.findByPk(id)

            res.status(200).json(todo)
        } catch (err) {
            next(err)
        }
    }

    // * Update Todo
    static async putUpdateTodo(req, res, next) {
        try {
            const id = +req.params.id
            const payload = convertPayload(req.body)
            const updateTodo = await Todo.update(payload, { where: { id }, returning: true })
            
            res.status(200).json(updateTodo[1][0])
        } catch (err) {
            next(err)
        }
    }

    // * Update Todo Status
    static async patchTodoStatus(req, res, next) {
        try {
            const id = +req.params.id
            const status = req.body.status
            const patched = await Todo.update({ status }, { where: { id }, returning: true })
            
            res.status(200).json(patched[1][0])
        } catch (err) {
            next(err)
        }
    }

    // * Delete Todo
    static async deleteTodoById(req, res, next) {
        try {
            const id = +req.params.id
            await Todo.destroy({ where: { id }})

            res.status(200).json({ message: 'todo success to delete' })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller