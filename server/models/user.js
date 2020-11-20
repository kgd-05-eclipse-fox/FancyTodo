'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt-pwd')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'email cannot be blank'
        },
        isEmail: {
          msg: 'Inputed value is not an Email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'password cannot be blank'
        },
        len: {
          args: [6,16],
          msg: 'password must be at least 6 characters and less than 16 characters'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook('beforeCreate', instance => {
    const hashed = hashPassword(instance.password)
    instance.password = hashed
  })
  return User;
};