const models = require('../models');

async function affecterAChantier(affectation) {
    console.log(affectation);
    return models.ChantierOuvrier.create(affectation).catch((err) => {
        return {
            status: 'error',
            message: 'cannot affect ouvrier ' + affectation.idOuvrier + ' to chantier ' + affectation.idChantier,
            details: err.errors
        };
    });
}

async function getById(id) {
    return models.Ouvrier.findByPk(id).catch((err) => {
        return {
            status: 'error',
            message: 'cannot ouvier with id ' + id,
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
    });
}

const sequelize = require('sequelize');

async function getChantiersOfOuvrier(id) {
    return models.sequelize.query("select Chantiers.* " +
        "       from ChantierOuvriers join ouvriers on ChantierOuvriers.OuvrierId = Ouvriers.id " +
        "       join Chantiers on ChantierOuvriers.ChantierId = Chantiers.id where OuvrierId = ?",
        {
            replacements: [id],
            type: sequelize.QueryTypes.SELECT
        });
}

module.exports = {
    affecterAChantier, getById, getOuvrierWithChantiers, getChantiersOfOuvrier
};
