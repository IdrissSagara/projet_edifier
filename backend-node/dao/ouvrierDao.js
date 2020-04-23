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

module.exports = {
    affecterAChantier, getById, getOuvrierWithChantiers
};
