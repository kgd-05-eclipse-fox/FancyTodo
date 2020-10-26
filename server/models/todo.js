'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      // define association here
    }
  };
  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    due_date: { 
      type: DataTypes.DATE,
      validate: {
        dateValidate(currDate) {
          const validate = currDate > new Date()
          if (!validate) throw new Error('Cannot Create or Update Todo')
        }
      } 
    },
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};