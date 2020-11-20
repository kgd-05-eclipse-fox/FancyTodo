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
      Todo.belongsTo(models.User, {
        foreignKey: 'UserId'
      })
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter title'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Description cannot be blank'
        }
      }
    },
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Date cannot be blank'
        },
        isDate: {
          args: true,
          msg: 'Must be in date format'
        },
        getNow(value) {
          const now = new Date()
          if (now >= value) {
            throw new Error('Due date should be greater than now')
          }
        }
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'UserId cannot be blank'
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });

  Todo.addHook('beforeCreate', (instance) => {
    instance.status = false
  })
  
  return Todo;
};