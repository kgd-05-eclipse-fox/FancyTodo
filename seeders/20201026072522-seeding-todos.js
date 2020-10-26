'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   const todo = [
     {
       title: "Go to gym",
       description: "Benchpress 10 times",
       status: "not finished",
       due_date: new Date(),
       createdAt: new Date(),
       updatedAt: new Date
     },
     {
      title: "Go swimming",
      description: "3 times repetition",
      status: "not finished",
      due_date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date
    }
   ]
   return queryInterface.bulkInsert('Todos', todo, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Todos', null, {});
  }
};
