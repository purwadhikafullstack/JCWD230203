'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('event_rates', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false, 
        autoIncrement: true
      },
      discount: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      markup: {
        type: Sequelize.INTEGER,
        allowNull: true
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('event_rates');
  }
};