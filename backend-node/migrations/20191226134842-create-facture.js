'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Factures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date_etablissement: {
        allowNull: false,
        type: Sequelize.DATE
      },
      montant: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      idChantier: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Chantiers',
          key: 'id',
        }
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Factures');
  }
};