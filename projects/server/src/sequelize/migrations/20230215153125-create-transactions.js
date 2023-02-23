'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      users_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      room_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total_price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      check_in: {
        type: Sequelize.DATE,
        allowNull: false
      },
      check_out: {
        type: Sequelize.DATE,
        allowNull: false
      },
      expired: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image_path: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('transactions');
  }
};