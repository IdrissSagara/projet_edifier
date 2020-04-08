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

async function update(chantier) {
    return models.Chantier.update({
            ClientId: chantier.ClientId,
            emplacement: chantier.emplacement,
            cout: chantier.cout,
            date_debut: chantier.date_debut,
            date_fin: chantier.date_fin,
            walita: chantier.walita,
            yereta: chantier.yereta,
            montant_dispo: chantier.montant_dispo
        },
        {
            where: {id: chantier.id}
        }).catch((err) => {
        console.error(err);
        return {
            status: 'error',
            message: 'An error occured when updating chantier'
        };
    });
}

module.exports = {
    getChantierById, update
};
