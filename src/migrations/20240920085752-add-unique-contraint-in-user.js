"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Roles", {
      fields: ["name"],
      type: "unique",
      name: "unique_name_constraint",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Roles", "unique_name_constraint");
  },
};
