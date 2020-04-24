'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let transaction = await queryInterface.sequelize.transaction({autocommit: false});
        try {
            await queryInterface.addColumn('Chantiers', 'createdBy', {
                type: Sequelize.INTEGER,
                defaultValue: 1,
                allowNull: false
            }, {transaction: transaction});

            await queryInterface.addColumn('Chantiers', 'updatedBy', {
                type: Sequelize.INTEGER,
                defaultValue: 1,
                allowNull: false
            }, {transaction: transaction});

            await queryInterface.addColumn('ChantierOuvriers', 'createdBy', {
                type: Sequelize.INTEGER,
                defaultValue: 1,
                allowNull: false
            }, {transaction: transaction});


            await queryInterface.addColumn('ChantierOuvriers', 'updatedBy', {
                type: Sequelize.INTEGER,
                defaultValue: 1,
                allowNull: false
            }, {transaction: transaction});

            await queryInterface.addColumn('Clients', 'createdBy', {
                type: Sequelize.INTEGER,
                defaultValue: 1,
                allowNull: false
            }, {transaction: transaction});

            await queryInterface.addColumn('Clients', 'updatedBy', {
                type: Sequelize.INTEGER,
                defaultValue: 1,
                allowNull: false
            }, {transaction: transaction});

            await queryInterface.addColumn('Factures', 'createdBy', {
                type: Sequelize.INTEGER,
                defaultValue: 1,
                allowNull: false
            }, {transaction: transaction});

            await queryInterface.addColumn('Factures', 'updatedBy', {
                type: Sequelize.INTEGER,
                defaultValue: 1,
                allowNull: false
            }, {transaction: transaction});

            await queryInterface.addColumn('Mouvements', 'createdBy', {
                type: Sequelize.INTEGER,
                defaultValue: 1,
                allowNull: false
            }, {transaction: transaction});


            await queryInterface.addColumn('Mouvements', 'updatedBy', {
                type: Sequelize.INTEGER,
                defaultValue: 1,
                allowNull: false
            }, {transaction: transaction});

            await queryInterface.addColumn('Ouvriers', 'createdBy', {
                type: Sequelize.INTEGER,
                defaultValue: 1,
                allowNull: false
            }, {transaction: transaction});

            await queryInterface.addColumn('Ouvriers', 'updatedBy', {
                type: Sequelize.INTEGER,
                defaultValue: 1,
                allowNull: false
            }, {transaction: transaction});

            await queryInterface.addColumn('Paiements', 'createdBy', {
                type: Sequelize.INTEGER,
                defaultValue: 1,
                allowNull: false
            }, {transaction: transaction});

            await queryInterface.addColumn('Paiements', 'updatedBy', {
                type: Sequelize.INTEGER,
                defaultValue: 1,
                allowNull: false
            }, {transaction: transaction});

            await transaction.commit();
            return await Promise.resolve();
        } catch (e) {
            await transaction.rollback();
            return await Promise.reject(e);
        }
    },

    down: async (queryInterface, Sequelize) => {
        let transaction = await queryInterface.sequelize.transaction({autocommit: false});
        try {
            await queryInterface.removeColumn('Chantiers', 'createdBy', {transaction: transaction});

            await queryInterface.removeColumn('Chantiers', 'updatedBy', {transaction: transaction});

            await queryInterface.removeColumn('ChantierOuvriers', 'createdBy', {transaction: transaction});

            await queryInterface.removeColumn('ChantierOuvriers', 'updatedBy', {transaction: transaction});

            await queryInterface.removeColumn('Clients', 'createdBy', {transaction: transaction});

            await queryInterface.removeColumn('Clients', 'updatedBy', {transaction: transaction});

            await queryInterface.removeColumn('Factures', 'createdBy', {transaction: transaction});

            await queryInterface.removeColumn('Factures', 'updatedBy', {transaction: transaction});

            await queryInterface.removeColumn('Mouvements', 'createdBy', {transaction: transaction});

            await queryInterface.removeColumn('Mouvements', 'updatedBy', {transaction: transaction});

            await queryInterface.removeColumn('Ouvriers', 'createdBy', {transaction: transaction});

            await queryInterface.removeColumn('Ouvriers', 'updatedBy', {transaction: transaction});

            await queryInterface.removeColumn('Paiements', 'createdBy', {transaction: transaction});

            await queryInterface.removeColumn('Paiements', 'updatedBy', {transaction: transaction});

            await transaction.commit();
            return await Promise.resolve();
        } catch (e) {
            await transaction.rollback();
            return await Promise.reject(e);
        }
    }
};
