'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Paiements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      chantierId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Chantiers',
          key: 'id',
        }
      },
      date_paiement: {
        allowNull: false,
        type: Sequelize.DATE
      },
      montant: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      montant_restant: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      commentaire: {
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Paiements');
  }
};