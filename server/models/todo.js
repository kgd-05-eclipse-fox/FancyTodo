'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: { type: DataTypes.STRING, validate: { notEmpty: { args: true, msg: 'Title tidak boleh kosong' }}},
    description: { type: DataTypes.STRING, validate: { notEmpty: { args: true, msg: 'Description tidak boleh kosong' }}},
    due_date: { 
      type: DataTypes.DATE,
      validate: {
        notEmpty: { args: true, msg: 'Due Date tidak boleh kosong' },
        dateValidate(currDate) {
          const validate = currDate > new Date()
          if (!validate) throw new Error('Date must be greater than today')
        }
      }
    },
    status: { type: DataTypes.BOOLEAN, validate: { notEmpty: { args: true, msg: 'Status tidak boleh kosong' }}},
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};