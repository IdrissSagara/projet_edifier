'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ChantierOuvriers', {
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
      idOuvrier: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Ouvriers',
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
    return queryInterface.dropTable('ChantierOuvriers');
  }
};