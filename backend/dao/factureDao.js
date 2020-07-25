let models = require('../models');

async function save(facture, transaction) {
    return models.Facture.create(facture, {transaction: transaction}).catch((err) => {
        return {
            status: 'error',
            message: 'cannot save facture',
            details: err.errors
        };
    });
}

module.exports = {
    save,
};