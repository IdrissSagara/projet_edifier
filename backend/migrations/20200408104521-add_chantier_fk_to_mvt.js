'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addConstraint('Mouvements', ['source'], {
        type: 'FOREIGN KEY',
        name: 'FK_chantier_source', // useful if using queryInterface.removeConstraint
        references: {
          table: 'Chantiers',
          field: 'id',
        },
        onDelete: 'no action',
        onUpdate: 'no action',
      });

      await queryInterface.addConstraint('Mouvements', ['destination'], {
        type: 'FOREIGN KEY',
        name: 'FK_chantier_destination', // useful if using queryInterface.removeConstraint
        references: {
          table: 'Chantiers',
          field: 'id',
        },
        onDelete: 'no action',
        onUpdate: 'no action',
      });

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
      await queryInterface.removeConstraint('Mouvements', 'FK_chantier_source');
      await queryInterface.removeConstraint('Mouvements', 'FK_chantier_destination');

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
