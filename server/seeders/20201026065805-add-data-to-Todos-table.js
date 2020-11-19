'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   let data = 
   [
     {
      title: "Olahraga",
      description: "Maraton",
      status: "not done",
      dueDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      title: "Olahraga",
      description: "GYM",
      status: "not done",
      dueDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
     },
     {
      title: "Olahraga",
      description: "push up",
      status: "not done",
      dueDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
     }
   ]
   await queryInterface.bulkInsert('Todos', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Todos', null, {});
  }
};
