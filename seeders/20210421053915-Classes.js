'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = require("../jsons/classes.json")
    data.forEach(e => {
      e.createdAt = new Date(),
      e.updatedAt = new Date()
    })
     return queryInterface.bulkInsert('Classes',data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Classes', null, {});
  }
};
