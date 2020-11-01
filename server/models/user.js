'use strict';
const { hashPassword } = require('../helpers/bcrypt.js')
const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Todo)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email format is not valid'
        },
        notEmpty: {
          args: true,
          msg: 'Email field is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password field is required'
        },
        min: {
          args: 6,
          msg: 'Minimal 6 characters'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook('beforeCreate', instance => {
    instance.password = hashPassword(instance.password)
  })
  
  
  return User;
};