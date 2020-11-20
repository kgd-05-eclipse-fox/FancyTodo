'use strict';

const todos = require('../server/todos.json')
todos.forEach(el=> {
  el.createdAt = new Date()
  el.updatedAt = new Date()
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Todos', todos, {} )

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Todos', null)
  }
};

