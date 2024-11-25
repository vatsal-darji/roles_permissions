"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "lname", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.renameColumn("Users", "name", "fname");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "lname");
    await queryInterface.renameColumn("Users", "fname", "name");
  },
};
