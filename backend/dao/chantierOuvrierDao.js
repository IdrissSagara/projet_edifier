const models = require('../models');

async function getOuvrierCount(distinct = true) {
    return models.ChantierOuvrier.count({distinct: distinct, col: 'OuvrierId'}).catch(err => {
        console.log(err);
        return {
            status: 'error',
            message: `Une erreur est survenue lors de la récupération du nombre d'ouvriers actuellement dans les chantiers`,
            details: err.errors
        }
    })
}

module.exports = {
    getOuvrierCount,
}
