'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex('Venues', ['name', 'location'], {
      unique: true,
      name: 'venue_name_location_unique'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('Venues', 'venue_name_location_unique');
  }
};


