'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Mouvements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      date_mouvement: {
        type: Sequelize.DATE
      },
      montant: {
        type: Sequelize.INTEGER
      },
      source: {
        type: Sequelize.INTEGER
      },
      destination: {
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
    return queryInterface.dropTable('Mouvements');
  }
};