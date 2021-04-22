'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Students', 'major', { 
      type: Sequelize.STRING 
    });
  },

  down: async (queryInterface, Sequelize) => {
     return queryInterface.removeColumn('Students', 'major', {});
  }
};
