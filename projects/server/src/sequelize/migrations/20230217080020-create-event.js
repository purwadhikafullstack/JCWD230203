'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('events', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      start_date: {
        type: Sequelize.DATE,
        allowNullL: false
      },
      end_date: {
        type: Sequelize.DATE,
        allowNullL: false
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      event_rates_id:  {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      room_id:  {
        type: Sequelize.INTEGER,
        allowNull: false
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
    await queryInterface.dropTable('events');
  }
};