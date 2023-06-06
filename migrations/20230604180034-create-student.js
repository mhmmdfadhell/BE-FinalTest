"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("students", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fullname: {
        type: Sequelize.STRING,
      },
      age: {
        type: Sequelize.INTEGER,
      },
      born_date: {
        type: Sequelize.DATE,
      },
      grade: {
        type: Sequelize.ENUM(
          "Mathematics",
          "Science",
          "Social",
          "Literature",
          "Martial Art",
          "Dance"
        ),
      },
      address: {
        type: Sequelize.STRING,
      },
      hp: {
        type: Sequelize.STRING,
      },
      parent_name: {
        type: Sequelize.STRING,
      },
      parent_hp: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("students");
  },
};
