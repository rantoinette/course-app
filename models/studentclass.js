'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentClass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StudentClass.belongsTo(models.Student, {foreignKey: "StudentId"})
      StudentClass.belongsTo(models.Class, {foreignKey: "ClassId"})
    }
  };
  StudentClass.init({
    StudentId: DataTypes.INTEGER,
    ClassId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StudentClass',
  });
  return StudentClass;
};