'use strict';
const hashedPassword = require('../helper/bcrypt.js')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Email not valid"
        },
        notEmpty: {
          args: true,
          msg: "Email cannot be empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password cannot be empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook('beforeCreate', (instance, option) => {
    let hashPassword = hashedPassword(instance.password)
    instance.password = hashPassword
  })
  return User;
};