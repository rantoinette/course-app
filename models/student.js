'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static major(major) {
       return `Bachelor of ${major}`
    }

    static associate(models) {
      Student.belongsToMany(models.Class, {through: "StudentClass"})
    }
  };
  Student.init({
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty : {
          msg: "First name cannot be empty!"
        }
      }
    },
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Email cannot be empty!"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password cannot be empty!"
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Gender cannot be empty!"
        }
      }
    },
    major: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Major cannot be empty!"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(instance, options) {
        if (instance.last_name == "") {
          instance.last_name = instance.first_name;
        }
      }
    },
    sequelize,
    modelName: 'Student',
  });
  return Student;
};