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
    static associate(models) {
      Student.belongsToMany(models.Class, {through: "StudentClass"})
    }
  };
  Student.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING
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