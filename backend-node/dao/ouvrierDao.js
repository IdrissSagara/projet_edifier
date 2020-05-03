const models = require('../models');

async function affecterAChantier(affectation) {
    console.log(affectation);
    return models.ChantierOuvrier.create(affectation).catch((err) => {
        return {
            status: 'error',
            message_: 'cannot affect ouvrier ' + affectation.idOuvrier + ' to chantier ' + affectation.idChantier,
            message: `Impossible d'affecter l'ouvrier ` + affectation.idOuvrier + ` au chantier ` + affectation.idChantier,
            details: err.errors
        };
    });
}

async function getById(id) {
    return models.Ouvrier.findByPk(id).catch((err) => {
        return {
            status: 'error',
            message: `Une erreur est servenue lors de récupérer l'ouvrier avec l'id ` + id,
            details: err.errors
        };
    });
}

async function getOuvrierWithChantiers(id) {
    return models.Ouvrier.findOne({
        where: {id: id},
        include: {
            model: models.ChantierOuvrier,
            include: models.Chantier
        }
    }).catch((err) => {
        return {
            status: 'error',
            message: `Une erreur est servenue lors de récupérer l'ouvrier avec l'id ` + id,
            details: err.errors
        };
    });
}

const sequelize = require('sequelize');

async function getChantiersOfOuvrier(id) {
    return models.sequelize.query("select Chantiers.* " +
        "       from ChantierOuvriers join Ouvriers on ChantierOuvriers.OuvrierId = Ouvriers.id " +
        "       join Chantiers on ChantierOuvriers.ChantierId = Chantiers.id where OuvrierId = ?",
        {
            replacements: [id],
            type: sequelize.QueryTypes.SELECT
        });
}

module.exports = {
    affecterAChantier, getById, getOuvrierWithChantiers, getChantiersOfOuvrier
};
