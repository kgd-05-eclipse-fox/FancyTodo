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
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    dueDate: DataTypes.DATE,
    UserId: DataTypes.INTEGER
  }, {
    hooks:{
      beforeValidate: (user, Option)=>{
        if(!user.status || user.status === null){
          user.status = 'not done'
        }
      },
      beforeCreate: (user, Option)=>{
        let date = new Date()
        if(user.dueDate<=date){
          throw {
            key: 'error duDate',
            status: 400,
            msg: 'Tanggal TODO minimal 1-hari dari hari ini'
          }
        }
      }
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};