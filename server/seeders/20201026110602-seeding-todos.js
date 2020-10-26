'use strict';

const arrValues = require('../data/books.json')

arrValues.forEach(item => {
  item.createdAt = new Date()
  item.updatedAt = new Date()
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Todos', arrValues, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Todos', null)
  }
};
