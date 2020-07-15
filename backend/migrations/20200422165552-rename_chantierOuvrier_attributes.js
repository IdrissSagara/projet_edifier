'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.renameColumn('ChantierOuvriers', 'idChantier', 'ChantierId');
            await queryInterface.renameColumn('ChantierOuvriers', 'idOuvrier', 'OuvrierId');

            await transaction.commit();
            return await Promise.resolve();
        } catch (e) {
            if (transaction) {
                await transaction.rollback();
            }
            return await Promise.reject(e);
        }
    },

    down: async (queryInterface, Sequelize) => {
        let transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.renameColumn('ChantierOuvriers', 'ChantierId', 'idChantier');
            await queryInterface.renameColumn('ChantierOuvriers', 'OuvrierId', 'idOuvrier');

            await transaction.commit();
            return await Promise.resolve();
        } catch (e) {
            if (transaction) {
                await transaction.rollback();
            }
            return await Promise.reject(e);
        }
    }
};
