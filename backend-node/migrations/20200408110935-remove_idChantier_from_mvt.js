'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('Mouvements', 'idChantier');
      await queryInterface.removeColumn('Mouvements', 'type');

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
      await ueryInterface.addColumn('Mouvements', 'idChantier', {
        type: Sequelize.INTEGER,
        allowNull: false
      });
      await ueryInterface.addColumn('Mouvements', 'type', {
        type: Sequelize.String,
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
