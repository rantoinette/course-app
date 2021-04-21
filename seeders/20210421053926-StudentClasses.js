'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = require("../jsons/studentClass.json")
    data.forEach(e => {
      e.createdAt = new Date(),
      e.updatedAt = new Date()
    })
     return queryInterface.bulkInsert('StudentClasses',data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('StudentClasses', null, {});
  }
};
