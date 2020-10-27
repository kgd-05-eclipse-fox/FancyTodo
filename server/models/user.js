'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helpers/bcrypt-superman')

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
          msg: 'Input harus berupa format Email'
        }
      },
      unique: {
        msg: 'Oops.. Email telah digunakan'
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [4, 16],
          msg: 'Password harus memiliki minimal 4 huruf dan maksimal 16 huruf'}
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