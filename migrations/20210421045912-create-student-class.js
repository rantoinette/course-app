'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('StudentClasses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      StudentId: {
          type: Sequelize.INTEGER,
          reference: {
            model: {
              tableName: "Students"
            },
            key: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE"
      },
      ClassId: {
        type: Sequelize.INTEGER,
        reference: {
          model: {
            tableName: "Classes"
          },
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('StudentClasses');
  }
};