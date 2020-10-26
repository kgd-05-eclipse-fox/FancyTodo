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
      validate:{
        isAfter:{
          args: new Date(Date.now()).toLocaleString(),
          msg: "cannot enter yesterday's date"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });

  Todo.addHook('beforeCreate', instance => {
    instance.status = 'not complete'
  })
  return Todo;
};