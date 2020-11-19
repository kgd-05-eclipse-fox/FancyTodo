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
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title tidak boleh kosong'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'description tidak boleh kosong'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'status tidak boleh kosong'
        }
      }
    },
    dueDate: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          args: true,
          msg: 'dueDate tidak boleh kosong'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'UserId tidak boleh kosong'
        }
      }
    }
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