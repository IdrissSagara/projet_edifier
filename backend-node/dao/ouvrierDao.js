const models = require('../models');

async function affecterAChantier(idOuvrier, idChantier) {
    return models.ChantierOuvrier.create({
        ChantierId: idChantier,
        OuvrierId: idOuvrier
    }).catch((err) => {
        return {
            status: 'error',
            message: 'cannot affect ouvrier ' + idOuvrier + ' to chantier ' + idChantier,
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

module.exports = {
    affecterAChantier, getById
};
