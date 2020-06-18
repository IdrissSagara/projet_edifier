let models = require('../models');

async function save(agence) {
    return models.Agence.create(agence, {}).catch((err) => {
        return {
            status: 'error',
            message: `Une erreur est survenue lors de l'enregistrement des informations de l'agence `,
            details: err.errors
        };
    });
}

async function getAgenceById(idAgence) {
    return models.Agence.findByPk(idAgence).catch((err) => {
        return {
            status: 'error',
            message: `Impossible de récupérer l'agence ` + idAgence,
            details: err.errors
        };
    });
}

async function updateAgence(agence) {
    return models.Agence.update({
            id: agence.id,
            rccm: agence.rccm,
            fiscal: agence.fiscal,
            libelle: agence.libelle,
            telephone: agence.telephone,
            fax: agence.fax,
            mail: agence.mail,
            adresse: agence.adresse,
            logo: agence.logo,
        },
        {
            where: {id: agence.id}
        }).catch((err) => {
        console.error(err);
        return {
            status: 'error',
            message: `Une erreur est survenue lors de la mise à jour de l'agence`,
            details: err
        };
    });
}

module.exports = {
    updateAgence, getAgenceById, save,
}