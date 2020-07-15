var models = require('../models');

async function getChantierById(id, include_client = true) {
    if (!include_client) {
        return models.Chantier.findByPk(id).catch((err) => {
            console.error(err);
            return {
                status: 'error',
                message: 'Une erreur est survenue lors de la récupération du chantier',
                details: err.errors
            };
        });
    }

    return models.Chantier.findOne({
        where: {id: id},
        include: [{
            model: models.Client,
            attributes: ['nom', 'prenom', 'telephone']
        }, {
            model: models.ChantierOuvrier,
            include: models.Ouvrier
        }]
    }).catch((err) => {
        console.error(err);
        return {
            status: 'error',
            message: 'Une erreur est survenue lors de la récupération du chantier',
            details: err.errors
        };
    });
    ;
}

async function update(chantier, transaction) {
    return models.Chantier.update({
            ClientId: chantier.ClientId,
            emplacement: chantier.emplacement,
            cout: chantier.cout,
            date_debut: chantier.date_debut,
            date_fin: chantier.date_fin,
            walita: chantier.walita,
            yereta: chantier.yereta,
            montant_dispo: chantier.montant_dispo,
            updatedBy: chantier.updatedBy
        },
        {
            where: {id: chantier.id}
        }, {transaction: transaction}).catch((err) => {
        console.error(err);
        return {
            status: 'error',
            message: 'Une erreur est survenue lors de la mise à jour du chantier',
            details: err.errors
        };
    });
}

async function getChantierWithOuvriers(id) {
    return models.Chantier.findOne({
        where: {id: id},
        include: {
            model: models.ChantierOuvrier,
            include: models.Ouvrier
        }
    }).catch((err) => {
        console.error(err);
        return {
            status: 'error',
            message: 'Une erreur est survenue lors de la récupération du chantier avec ses ouvriers',
            details: err.errors
        };
    });
}

module.exports = {
    getChantierById, update, getChantierWithOuvriers
};
