var models = require('../models');

async function getChantierById(id, include_client = true) {
    if (!include_client) {
        return models.Chantier.findByPk(id);
    }

    return models.Chantier.findOne({
        where: {id: id},
        include: [{
            model: models.Client,
            attributes: ['nom', 'prenom', 'telephone']
        }]
    });
}

async function getById(id) {
    return models.Mouvement.findByPk(id);
}

async function save(mouvement, transaction) {
    return models.Mouvement.create({
        source: mouvement.source,
        destination: mouvement.destination,
        commentaire: mouvement.commentaire,
        montant: mouvement.montant
    }, {transaction: transaction}).catch(err => {
        console.error(err);
        return {
            status: 'error',
            message: 'An error occured when creating mouvement'
        };
    });
}

module.exports = {
    getById, save
};
