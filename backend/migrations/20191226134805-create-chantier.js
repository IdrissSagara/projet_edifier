'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Chantiers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clientId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Clients',
          key: 'id',
        }
      },
      emplacement: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cout: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      date_debut: {
        type: Sequelize.DATE
      },
      date_fin: {
        type: Sequelize.DATE
      },
      walita: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      yereta: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      montant_dispo: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Chantiers');
  }
};