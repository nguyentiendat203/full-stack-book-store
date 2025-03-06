'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Book', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      supplierId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      price: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      discount: {
        type: Sequelize.INTEGER
      },
      stock: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pageNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      publishingYear: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      totalRating: {
        type: Sequelize.INTEGER
      },
      sold: {
        type: Sequelize.INTEGER
      },
      ratingsAverage: {
        type: Sequelize.DOUBLE,
        defaultValue: 3.5
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Book')
  }
}
