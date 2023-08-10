'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('recipes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      recipe_name: Sequelize.STRING,
      image: Sequelize.STRING,
      ingredients: Sequelize.STRING,
      preparation: Sequelize.STRING,
      preparation_time: Sequelize.STRING,
      income: Sequelize.STRING,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('recipes')
  }
};
