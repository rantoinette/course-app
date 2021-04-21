'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = require("../jsons/students.json")
    data.forEach(e => {
      e.createdAt = new Date(),
      e.updatedAt = new Date()
    })
    // console.log(data)
     return queryInterface.bulkInsert('Students',data, {});
  },

  down: (queryInterface, Sequelize) => {

     return queryInterface.bulkDelete('Students', null, {});
  }
};
