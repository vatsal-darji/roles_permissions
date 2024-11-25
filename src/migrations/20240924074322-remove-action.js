"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Permissions", "action");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Permissions", "action", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
