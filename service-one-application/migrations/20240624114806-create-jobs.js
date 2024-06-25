'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      jobTitle: {
        type: Sequelize.STRING
      },
      companyName: {
        type: Sequelize.STRING
      },
      jobPlatform: {
        type: Sequelize.STRING
      },
      applicationDate: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.STRING
      },
      applicationStatus: {
        type: Sequelize.ENUM('Applied', 'Not Shortlisted', 'InProgress', 'Rejected'),
        allowNull: false,
        defaultValue: 'Applied',
      },
      followUpDate: {
        type: Sequelize.DATE
      },
      notes: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Jobs');
  }
};