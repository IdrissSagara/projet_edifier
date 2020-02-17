var models = require('../models');

/**
 * Gets the paiement which is identified by its id and its chantier id
 * @param id_paiement
 * @returns
 */
async function getPaiementById(id_paiement) {
    return models.Paiement.findByPk(id_paiement);
}

/**
 * Destroys the paiement passed in parameter
 * @param paiement Paiement to destroy
 * @returns {Promise<void>} Returns destroyed paiement
 */
async function destroy(paiement) {
    return paiement.destroy();
}

module.exports = {
    getPaiementById, destroy
};
