'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true
      }
    },
    description: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true
      }
    }, 
    status: {
      type : DataTypes.STRING,
      validate : {
      notEmpty : true
      }
    },
    due_date: {
      type : DataTypes.DATE,
      validate : {
      notEmpty : true
      }
    },
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};