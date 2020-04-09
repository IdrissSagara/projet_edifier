'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('Mouvements', 'idChantier');
      await queryInterface.removeColumn('Mouvements', 'type');
        await queryInterface.removeColumn('Mouvements', 'date_mouvement');

      await transaction.commit();
      return Promise.resolve();
    } catch (e) {
      if (transaction) {
        await transaction.rollback();
      }
      return Promise.reject(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    let transaction = await queryInterface.sequelize.transaction();
    try {
        await queryInterface.addColumn('Mouvements', 'idChantier', {
            type: Sequelize.INTEGER,
            allowNull: false
        });
        await queryInterface.addColumn('Mouvements', 'type', {
            type: Sequelize.STRING,
            allowNull: true
        });
        await queryInterface.addColumn('Mouvements', 'date_mouvement', {
            type: Sequelize.DATE,
            allowNull: true
        });

        await transaction.commit();
        return Promise.resolve();
    } catch (e) {
      if (transaction) {
        await transaction.rollback();
      }
      return Promise.reject(e);
    }
  }
};
