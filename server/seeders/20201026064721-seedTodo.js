'use strict';

let todos = require('../json/todo.json')

todos.forEach( todo => {
  todo.updatedAt = new Date()
  todo.createdAt = new Date()
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Todos', todos, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Todos', null, {})
  }
};
