'use strict';

let users = require('../json/user.json')

users.forEach( user => {
  user.updatedAt = new Date()
  user.createdAt = new Date()
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', users, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
