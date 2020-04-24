'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        let transaction = await queryInterface.sequelize.transaction({autocommit: false});
        try {
            await queryInterface.addConstraint('Chantiers', ['createdBy'], {
                references: {
                    table: 'Users',
                    field: 'id'
                },
                onDelete: 'no action',
                onUpdate: 'no action',
                type: 'FOREIGN KEY',
                name: 'FK_created_user_chantier',
            }, {transaction: transaction});

            await queryInterface.addConstraint('Chantiers', ['updatedBy'], {
                type: 'FOREIGN KEY',
                name: 'FK_updateed_user_chantier', // useful if using queryInterface.removeConstraint
                references: {
                    table: 'Users',
                    field: 'id'
                },
                onDelete: 'no action',
                onUpdate: 'no action',
            }, {transaction: transaction});

            await queryInterface.addConstraint('ChantierOuvriers', ['createdBy'], {
                type: 'FOREIGN KEY',
                name: 'FK_created_user_chantierOuvrier', // useful if using queryInterface.removeConstraint
                references: {
                    table: 'Users',
                    field: 'id'
                },
                onDelete: 'no action',
                onUpdate: 'no action',
            }, {transaction: transaction});

            await queryInterface.addConstraint('ChantierOuvriers', ['updatedBy'], {
                type: 'FOREIGN KEY',
                name: 'FK_updatedBy_user_chantierOuvrier', // useful if using queryInterface.removeConstraint
                references: {
                    table: 'Users',
                    field: 'id'
                },
                onDelete: 'no action',
                onUpdate: 'no action',
            }, {transaction: transaction});

            await queryInterface.addConstraint('Clients', ['createdBy'], {
                type: 'FOREIGN KEY',
                name: 'FK_createdBy_user_client', // useful if using queryInterface.removeConstraint
                references: {
                    table: 'Users',
                    field: 'id'
                },
                onDelete: 'no action',
                onUpdate: 'no action',
            }, {transaction: transaction});

            await queryInterface.addConstraint('Clients', ['updatedBy'], {
                type: 'FOREIGN KEY',
                name: 'FK_updated_user_client', // useful if using queryInterface.removeConstraint
                references: {
                    table: 'Users',
                    field: 'id'
                },
                onDelete: 'no action',
                onUpdate: 'no action',
            }, {transaction: transaction});

            await queryInterface.addConstraint('Factures', ['createdBy'], {
                type: 'FOREIGN KEY',
                name: 'FK_created_user_Facture', // useful if using queryInterface.removeConstraint
                references: {
                    table: 'Users',
                    field: 'id'
                },
                onDelete: 'no action',
                onUpdate: 'no action',
            }, {transaction: transaction});

            await queryInterface.addConstraint('Factures', ['updatedBy'], {
                type: 'FOREIGN KEY',
                name: 'FK_updated_user_Facture', // useful if using queryInterface.removeConstraint
                references: {
                    table: 'Users',
                    field: 'id'
                },
                onDelete: 'no action',
                onUpdate: 'no action',
            }, {transaction: transaction});

            await queryInterface.addConstraint('Mouvements', ['createdBy'], {
                type: 'FOREIGN KEY',
                name: 'FK_created_user_Mouvement', // useful if using queryInterface.removeConstraint
                references: {
                    table: 'Users',
                    field: 'id'
                },
                onDelete: 'no action',
                onUpdate: 'no action',
            }, {transaction: transaction});

            await queryInterface.addConstraint('Mouvements', ['updatedBy'], {
                type: 'FOREIGN KEY',
                name: 'FK_updated_user_Mouvement', // useful if using queryInterface.removeConstraint
                references: {
                    table: 'Users',
                    field: 'id'
                },
                onDelete: 'no action',
                onUpdate: 'no action',
            }, {transaction: transaction});

            await queryInterface.addConstraint('Ouvriers', ['createdBy'], {
                type: 'FOREIGN KEY',
                name: 'FK_created_user_Ouvriers', // useful if using queryInterface.removeConstraint
                references: {
                    table: 'Users',
                    field: 'id'
                },
                onDelete: 'no action',
                onUpdate: 'no action',
            }, {transaction: transaction});

            await queryInterface.addConstraint('Ouvriers', ['updatedBy'], {
                type: 'FOREIGN KEY',
                name: 'FK_updated_user_Ouvriers', // useful if using queryInterface.removeConstraint
                references: {
                    table: 'Users',
                    field: 'id'
                },
                onDelete: 'no action',
                onUpdate: 'no action',
            }, {transaction: transaction});

            await queryInterface.addConstraint('Paiements', ['createdBy'], {
                type: 'FOREIGN KEY',
                name: 'FK_created_user_Paiements', // useful if using queryInterface.removeConstraint
                references: {
                    table: 'Users',
                    field: 'id'
                },
                onDelete: 'no action',
                onUpdate: 'no action',
            }, {transaction: transaction});

            await queryInterface.addConstraint('Paiements', ['updatedBy'], {
                type: 'FOREIGN KEY',
                name: 'FK_updated_user_Paiements', // useful if using queryInterface.removeConstraint
                references: {
                    table: 'Users',
                    field: 'id'
                },
                onDelete: 'no action',
                onUpdate: 'no action',
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
            await queryInterface.removeConstraint('Chantiers', 'FK_created_user_chantier', {transaction: transaction});
            await queryInterface.removeConstraint('Chantiers', 'FK_updateed_user_chantier', {transaction: transaction});
            await queryInterface.removeConstraint('ChantierOuvriers', 'FK_created_user_chantierOuvrier', {transaction: transaction});
            await queryInterface.removeConstraint('ChantierOuvriers', 'FK_updatedBy_user_chantierOuvrier', {transaction: transaction});
            await queryInterface.removeConstraint('Clients', 'FK_createdBy_user_client', {transaction: transaction});
            await queryInterface.removeConstraint('Clients', 'FK_updated_user_client', {transaction: transaction});
            await queryInterface.removeConstraint('Factures', 'FK_created_user_Facture', {transaction: transaction});
            await queryInterface.removeConstraint('Factures', 'FK_updated_user_Facture', {transaction: transaction});
            await queryInterface.removeConstraint('Mouvements', 'FK_created_user_Mouvement', {transaction: transaction});
            await queryInterface.removeConstraint('Mouvements', 'FK_updated_user_Mouvement', {transaction: transaction});
            await queryInterface.removeConstraint('Ouvriers', 'FK_created_user_Ouvriers', {transaction: transaction});
            await queryInterface.removeConstraint('Ouvriers', 'FK_updated_user_Ouvriers', {transaction: transaction});
            await queryInterface.removeConstraint('Paiements', 'FK_created_user_Paiements', {transaction: transaction});
            await queryInterface.removeConstraint('Paiements', 'FK_updated_user_Paiements', {transaction: transaction});

            await transaction.commit();
            return await Promise.resolve();
        } catch (e) {
            await transaction.rollback();
            return await Promise.reject(e);
        }
    }
};
