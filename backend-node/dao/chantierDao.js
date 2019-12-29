var models = require('../models');

async function save(chantier) {
    models.Chantier.create({
        ClientId: chantier.clientId,
        emplacement: chantier.emplacement,
        cout: chantier.cout,
        date_debut: chantier.date_debut,
        date_fin: chantier.date_fin,
        walita: chantier.walita,
        yereta: chantier.yereta,
        montant_dispo: chantier.montant_dispo
    }).then((newChantier) => {
        return newChantier;
    }).catch((err) => {
        console.error(err);
        return 'unable to create chantier';
    });
}

module.exports = {
    save,
}