'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    combineDayPeriod() {
      return `${this.day} ${this.period}`
    }
    static associate(models) {
      Class.belongsToMany(models.Student, {through: "StudentClass"})
    }
  };
  Class.init({
    name: DataTypes.STRING,
    day: DataTypes.STRING,
    period: DataTypes.STRING,
    description: DataTypes.TEXT,
    class_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Class',
  });
  return Class;
};