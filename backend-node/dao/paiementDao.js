let models = require('../models');

async function save(paiement, transaction) {
    return models.Paiement.create(paiement, {
        transaction: transaction
    }).catch((err) => {
        return {
            status: 'error',
            message: `Une erreur est survenue lors de l'enregistrement du paiement`,
            details: err.errors
        };
    });
}

/**
 * Gets the paiement which is identified by its id and its chantier id
 * @param id_paiement
 * @returns
 */
async function getPaiementById(id_paiement) {
    return models.Paiement.findByPk(id_paiement).catch((err) => {
        return {
            status: 'error',
            message: `Impossible de récupérer le paiement ` + id_paiement,
            details: err.errors
        };
    });
}

/**
 * Destroys the paiement passed in parameter
 * @param paiement Paiement to destroy
 * @param transaction
 * @returns {Promise<void>} Returns destroyed paiement
 */
async function destroy(paiement, transaction) {
    return paiement.destroy({transaction: transaction}).catch((err) => {
        return {
            status: 'error',
            message: `Impossible de supprimer le paiment avec l'id ` + paiement.id,
            details: err.errors
        };
    });
}

async function getAll(options) {
    return models.Paiement.findAll(options).catch((err) => {
        console.error(err);
        return {
            status: 'error',
            message: `Une erreur est survenue lors de l'enregistrement des paiements`
        };
    });
}

module.exports = {
    getPaiementById, destroy, getAll, save
};
