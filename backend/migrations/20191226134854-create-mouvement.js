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
      montant: {
        type: Sequelize.INTEGER
      },
      source: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Chantiers',
          key: 'id',
        }
      },
      destination: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Chantiers',
          key: 'id',
        }
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