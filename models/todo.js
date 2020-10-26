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
    }
  };
  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          args: true,
          msg: "must be in date format"
        },
        isAfter: {
          args: "2020-10-26",
          msg: "must be greater than today"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  Todo.addHook('beforeCreate', (instance) => {
    instance.status = "not finished"
  })
  return Todo;
};